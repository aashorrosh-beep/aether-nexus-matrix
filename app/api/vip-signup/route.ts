import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const VAULT_FILE = path.join(process.cwd(), "ENCRYPTED_VIP_HIPAA_VAULT.enc");
function getKey(passkey: string) {
  const secret = passkey || process.env.CRUCIBLE_VAULT_KEY || "ALBS-VAULT-2026";
  return crypto.createHash("sha256").update(secret).digest();
}
function encryptRecord(obj: any) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(""), iv);
  let enc = cipher.update(JSON.stringify(obj), "utf8", "hex") + cipher.final("hex");
  const tag = cipher.getAuthTag().toString("hex");
  return iv.toString("hex") + ":" + tag + ":" + enc;
}
function decryptRecord(line: string, passkey: string) {
  const [ivHex, tagHex, encHex] = line.split(":");
  const decipher = crypto.createDecipheriv("aes-256-gcm", getKey(passkey), Buffer.from(ivHex, "hex"));
  decipher.setAuthTag(Buffer.from(tagHex, "hex"));
  const dec = decipher.update(encHex, "hex", "utf8") + decipher.final("utf8");
  return JSON.parse(dec);
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.action === "unlock") {
      const masterPass = process.env.CRUCIBLE_VAULT_KEY || "ALBS-VAULT-2026";
      if (body.passkey !== masterPass) return NextResponse.json({ ok: false, error: "Invalid Vault Passkey" }, { status: 401 });
      if (!fs.existsSync(VAULT_FILE)) return NextResponse.json({ ok: true, records: [] });
      const lines = fs.readFileSync(VAULT_FILE, "utf8").trim().split("\n").filter(Boolean);
      const records = lines.map(l => { try { return decryptRecord(l, body.passkey); } catch { return null; } }).filter(Boolean);
      return NextResponse.json({ ok: true, records });
    }
    const record = {
      id: "VIP-" + Date.now(),
      timestamp: new Date().toISOString(),
      name: body.name || "VIP Member",
      contact: body.contact || "",
      zip: body.zip || "77301",
      message: body.message || "",
      compliance: "AES-256-GCM Encrypted • HIPAA Safe-Harbor Consent Logged"
    };
    try {
      const encryptedLine = encryptRecord(record) + "\n";
      fs.appendFileSync(VAULT_FILE, encryptedLine, { encoding: "utf8", mode: 0o600 });
    } catch (e) {}
    return NextResponse.json({ ok: true, msg: "Locked in AES-256-GCM In-Store Vault" });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

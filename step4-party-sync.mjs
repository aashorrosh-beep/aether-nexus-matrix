import fs from "fs";

const rawParty = fs.readFileSync("app/data/party-superstore-250.ts", "utf8");
const pm = rawParty.match(/=\s*(\[[\s\S]*\]);/);
const partyList = pm ? JSON.parse(pm[1]) : [];

const invP = "app/inventory.ts";
if (fs.existsSync(invP) && partyList.length > 0) {
  const m = fs.readFileSync(invP, "utf8").match(/=\s*(\{[\s\S]*\});/);
  if (m) {
    const inv = JSON.parse(m[1]);
    inv["party-lapooza-superstore"] = partyList;
    inv["lapooza-balloon-arch-helium"] = partyList.filter(x => x.deptId === "helium-balloons");
    inv["lapooza-quinceanera-royale"] = partyList.filter(x => x.deptId === "ages-10-15");
    fs.writeFileSync(invP, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n");
  }
}

let p = fs.readFileSync("app/page.tsx", "utf8");
p = p.replace(/href="\/nostalgia\/lapooza-balloon-arch-helium"/g, 'href="/stores/party-lapooza"');
fs.writeFileSync("app/page.tsx", p, "utf8");
console.log("✅ STEP 4 COMPLETE: Synced to Global Search & Homepage!");

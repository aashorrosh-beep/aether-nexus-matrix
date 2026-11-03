import fs from "fs";
import { partySuperstore250 } from "./app/data/party-superstore-250.ts";

const invP = "app/inventory.ts";
if (fs.existsSync(invP)) {
  const m = fs.readFileSync(invP, "utf8").match(/=\s*(\{[\s\S]*\});/);
  if (m) {
    const inv = JSON.parse(m[1]);
    inv["party-lapooza-superstore"] = partySuperstore250;
    inv["lapooza-balloon-arch-helium"] = partySuperstore250.filter(x => x.deptId === "helium-balloons");
    inv["lapooza-quinceanera-royale"] = partySuperstore250.filter(x => x.deptId === "ages-10-15");
    fs.writeFileSync(invP, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n");
  }
}

let p = fs.readFileSync("app/page.tsx", "utf8");
p = p.replace(/href="\/nostalgia\/lapooza-balloon-arch-helium"/g, 'href="/stores/party-lapooza"');
fs.writeFileSync("app/page.tsx", p, "utf8");
console.log("✅ STEP 3 DONE: Party Lapooza Synced to Global Search & Homepage!");

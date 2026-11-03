import fs from "fs";

const rawAu = fs.readFileSync("app/data/sanctuary-autism-150.ts", "utf8");
const am = rawAu.match(/=\s*(\[[\s\S]*\]);/);
const auList = am ? JSON.parse(am[1]) : [];

const invP = "app/inventory.ts";
if (fs.existsSync(invP) && auList.length > 0) {
  const m = fs.readFileSync(invP, "utf8").match(/=\s*(\{[\s\S]*\});/);
  if (m) {
    const inv = JSON.parse(m[1]);
    inv["sanctuary-autism-spectrum"] = auList;
    inv["sensory-Calm-autism-haven"] = auList;
    fs.writeFileSync(invP, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n");
  }
}
console.log("✅ AUTISM STEP 4 DONE: Synced!");

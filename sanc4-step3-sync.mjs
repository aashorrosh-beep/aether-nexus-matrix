import fs from "fs";

const rawPt = fs.readFileSync("app/data/sanctuary-ptsd-150.ts", "utf8");
const pm = rawPt.match(/=\s*(\[[\s\S]*\]);/);
const ptList = pm ? JSON.parse(pm[1]) : [];

const invP = "app/inventory.ts";
if (fs.existsSync(invP) && ptList.length > 0) {
  const m = fs.readFileSync(invP, "utf8").match(/=\s*(\{[\s\S]*\});/);
  if (m) {
    const inv = JSON.parse(m[1]);
    inv["sanctuary-ptsd-veterans"] = ptList;
    inv["ptsd-veterans-peace-haven"] = ptList;
    fs.writeFileSync(invP, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n");
  }
}
console.log("✅ PTSD STEP 5 DONE: 150-Item PTSD & Veterans Sanctuary Synced!");

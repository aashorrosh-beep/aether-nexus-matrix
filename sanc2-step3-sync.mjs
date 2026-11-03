import fs from "fs";

const rawMd = fs.readFileSync("app/data/sanctuary-md-150.ts", "utf8");
const mm = rawMd.match(/=\s*(\[[\s\S]*\]);/);
const mdList = mm ? JSON.parse(mm[1]) : [];

const invP = "app/inventory.ts";
if (fs.existsSync(invP) && mdList.length > 0) {
  const m = fs.readFileSync(invP, "utf8").match(/=\s*(\{[\s\S]*\});/);
  if (m) {
    const inv = JSON.parse(m[1]);
    inv["sanctuary-md-mobility"] = mdList;
    inv["adaptive-mobility-haven"] = mdList;
    fs.writeFileSync(invP, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n");
  }
}
console.log("✅ MD STEP 3 DONE: Synced!");

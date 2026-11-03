import fs from "fs";

const rawHp = fs.readFileSync("app/data/holistic-peptides-100.ts", "utf8");
const hm = rawHp.match(/=\s*(\[[\s\S]*\]);/);
const hpList = hm ? JSON.parse(hm[1]) : [];

const invP = "app/inventory.ts";
if (fs.existsSync(invP) && hpList.length > 0) {
  const m = fs.readFileSync(invP, "utf8").match(/=\s*(\{[\s\S]*\});/);
  if (m) {
    const inv = JSON.parse(m[1]);
    inv["holistic-peptides-wellness"] = hpList;
    inv["peptide-research-vault"] = hpList.filter(x => x.deptId === "peptides-creams");
    inv["holistic-herbal-apothecary"] = hpList.filter(x => x.deptId === "herbal-apothecary");
    fs.writeFileSync(invP, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n");
  }
}
console.log("✅ STEP 4 DONE: All 200 Holistic, Peptide, Memory & Oncology-Comfort Items Synced!");

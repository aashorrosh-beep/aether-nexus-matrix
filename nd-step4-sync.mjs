import fs from "fs";

const rawNd = fs.readFileSync("app/data/sportflix-fishing-camping-60.ts", "utf8");
const nm = rawNd.match(/=\s*(\[[\s\S]*\]);/);
const ndList = nm ? JSON.parse(nm[1]) : [];

const invP = "app/inventory.ts";
if (fs.existsSync(invP) && ndList.length > 0) {
  const m = fs.readFileSync(invP, "utf8").match(/=\s*(\{[\s\S]*\});/);
  if (m) {
    const inv = JSON.parse(m[1]);
    inv["sportflix-fishing-camping"] = ndList;
    inv["sportlick-marine-fishing-camping"] = ndList;
    fs.writeFileSync(invP, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n");
  }
}
console.log("✅ ND STEP 4 DONE: SPORTFLIX WORLD North Dakota Fishing & Camping Synced!");

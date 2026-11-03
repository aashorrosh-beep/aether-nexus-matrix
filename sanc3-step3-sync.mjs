import fs from "fs";

if (fs.existsSync("app/sportsflix")) {
  fs.rmSync("app/sportsflix", { recursive: true, force: true });
}

const rawBd = fs.readFileSync("app/data/sanctuary-blind-deaf-150.ts", "utf8");
const bm = rawBd.match(/=\s*(\[[\s\S]*\]);/);
const bdList = bm ? JSON.parse(bm[1]) : [];

const invP = "app/inventory.ts";
if (fs.existsSync(invP) && bdList.length > 0) {
  const m = fs.readFileSync(invP, "utf8").match(/=\s*(\{[\s\S]*\});/);
  if (m) {
    const inv = JSON.parse(m[1]);
    inv["sanctuary-blind-deaf"] = bdList;
    inv["blind-deaf-sensory-haven"] = bdList;
    fs.writeFileSync(invP, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n");
  }
}
console.log("✅ BLIND & DEAF STEP 3 DONE: Synced & Old /sportsflix Cleaned!");

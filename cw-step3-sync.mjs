import fs from "fs";

const rawCw = fs.readFileSync("app/data/car-wash-100.ts", "utf8");
const cm = rawCw.match(/=\s*(\[[\s\S]*\]);/);
const carList = cm ? JSON.parse(cm[1]) : [];

const invP = "app/inventory.ts";
if (fs.existsSync(invP) && carList.length > 0) {
  const m = fs.readFileSync(invP, "utf8").match(/=\s*(\{[\s\S]*\});/);
  if (m) {
    const inv = JSON.parse(m[1]);
    inv["diy-car-wash-detail-pro"] = carList;
    inv["us-trend-car-detailing-pro"] = carList;
    fs.writeFileSync(invP, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n");
  }
}
console.log("✅ CAR WASH STEP 3 DONE: Pure Car Wash Store Synced!");

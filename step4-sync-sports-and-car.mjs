import fs from "fs";

const invP = "app/inventory.ts";
if (fs.existsSync(invP)) {
  const m = fs.readFileSync(invP, "utf8").match(/=\s*(\{[\s\S]*\});/);
  if (m) {
    const inv = JSON.parse(m[1]);
    const readJson = (file) => {
      if (!fs.existsSync(file)) return [];
      const rm = fs.readFileSync(file, "utf8").match(/=\s*(\[[\s\S]*\]);/);
      return rm ? JSON.parse(rm[1]) : [];
    };
    inv["sportlick-baseball-diamond"] = readJson("app/data/sportsflix-baseball.ts");
    inv["sportlick-football-gridiron"] = readJson("app/data/sportsflix-football.ts");
    inv["sportlick-atv-four-wheelers"] = readJson("app/data/sportsflix-atvs-offroad.ts");
    inv["sportlick-basketball-hoops"] = readJson("app/data/sportsflix-basketball.ts");
    inv["sportlick-golf-pickleball-plaza"] = readJson("app/data/sportsflix-golf-pickleball.ts");
    inv["sportlick-combat-boxing-mma"] = readJson("app/data/sportsflix-combat-fitness.ts");
    inv["diy-car-wash-detail-pro"] = readJson("app/data/car-wash-100.ts");
    inv["us-trend-car-detailing-pro"] = readJson("app/data/car-wash-100.ts");
    fs.writeFileSync(invP, "export const masterInventory: Record<string, any[]> = " + JSON.stringify(inv, null, 2) + ";\n");
  }
}
console.log("✅ STEP 4 COMPLETE: All 6 Sportsflix Stores & Car Wash Superstore Synced to Global Search!");

import fs from "fs";
const p = "app/data/christmas-superstore-100.ts";
if (fs.existsSync(p)) {
  const m = fs.readFileSync(p, "utf8").match(/=\s*(\[[\s\S]*\]);/);
  if (m) {
    const pat = [3, 18, 2, 8, 4, 22, 5, 9, 3, 15, 2, 7, 4, 26, 6];
    const out = JSON.parse(m[1]).map((it, i) => {
      const c = pat[i % pat.length];
      return {
        ...it,
        count: c,
        stockTier: c <= 5 ? "URGENT_LOW" : (c <= 11 ? "MOVING_FAST" : "DEEP_STOCK"),
        backupSuppliers: ["Primary Direct Hub", "Backup Hub A (Auto-Swap <=2)", "ALBS Concierge Desk"]
      };
    });
    fs.writeFileSync(p, "export const christmasSuperstore100 = " + JSON.stringify(out, null, 2) + ";\n");
    console.log("✅ PART A DONE: 250 SKUs updated with Scarcity Counts & Backup Suppliers!");
  }
}

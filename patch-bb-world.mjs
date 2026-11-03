import fs from "fs";
const p = "app/sportflix/baseball/page.tsx";
if (fs.existsSync(p)) {
  let s = fs.readFileSync(p, "utf8");
  s = s.replace("⚾ SPORTFLIX: Baseball & Softball Diamond Superstore (60 Pro Items)", "🇺🇸 SPORTFLIX WORLD: An American Tradition — ⚾ Baseball & Softball Diamond (60 Pro Items)");
  fs.writeFileSync(p, s, "utf8");
  console.log("✅ Baseball updated to SPORTFLIX WORLD: An American Tradition!");
}

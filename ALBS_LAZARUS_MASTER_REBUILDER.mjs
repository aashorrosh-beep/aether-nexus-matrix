#!/usr/bin/env node
import fs from "fs";
import path from "path";

console.log("⚡ [ALBS LAZARUS REBUILDER] Restoring / Cloning Full Mall Architecture...");
const bp = JSON.parse(fs.readFileSync("ALBS_MASTER_SITE_BLUEPRINT.json", "utf8"));
let restored = 0;
for (const [filePath, content] of Object.entries(bp.files)) {
  const dir = path.dirname(filePath);
  if (dir && dir !== ".") fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  restored++;
}
console.log("✅ [1-SECOND REBUILD COMPLETE] Restored " + restored + " Core Files, Storefronts, Vaults & Inventory!");
console.log("🚀 Next step: Run `npm install && npm run build` to launch in any new folder or domain!");

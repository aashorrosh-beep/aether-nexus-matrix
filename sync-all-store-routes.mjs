import fs from "fs";

const goodStorefront = fs.readFileSync("app/nostalgia/[storeId]/page.tsx", "utf8");

// 1. Sync root app/[storeId]/page.tsx so /room-name works identically to /nostalgia/room-name
if (fs.existsSync("app/[storeId]/page.tsx")) {
  const rootAdjusted = goodStorefront.replace(`from "../../inventory"`, `from "../inventory"`);
  fs.writeFileSync("app/[storeId]/page.tsx", rootAdjusted, "utf8");
  console.log("✅ Synced app/[storeId]/page.tsx!");
}

// 2. Sync root app/[storeId]/[itemId]/page.tsx so clicking any individual item URL loads the storefront with that SKU open
if (fs.existsSync("app/[storeId]/[itemId]/page.tsx")) {
  fs.writeFileSync("app/[storeId]/[itemId]/page.tsx", goodStorefront, "utf8");
  console.log("✅ Synced app/[storeId]/[itemId]/page.tsx!");
}

// 3. Ensure all netrix static room pages also use the zero-gap borderless layout
if (fs.existsSync("app/netrix")) {
  for (const dir of fs.readdirSync("app/netrix")) {
    const p = `app/netrix/${dir}/page.tsx`;
    if (fs.existsSync(p) && dir !== "[storeId]") {
      let c = fs.readFileSync(p, "utf8");
      c = c.replace(/gap-[2345678]/g, "gap-0").replace(/object-contain/g, "object-cover");
      fs.writeFileSync(p, c, "utf8");
    }
  }
  console.log("✅ Synced all /netrix/* room pages!");
}

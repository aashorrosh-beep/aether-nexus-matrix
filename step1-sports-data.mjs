import fs from "fs";

const SPORTS = [
  { slug: "baseball", label: "Baseball & Softball Diamond Pro", zipEvent: "Batting Cages, Select/Little League Tournaments & Pitching Labs", img: "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=600", cats: ["1-Box Complete Player & Coach Bundles", "BBCOR, USSSA & Wood Bats", "Pro Leather Fielding & Catcher Gloves", "Pitching Machines, Nets & Radar Guns"] },
  { slug: "football", label: "Football Gridiron Pro", zipEvent: "7-on-7 Tournaments, Turf Gridiron Fields & Youth/HS Combine Camps", img: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600", cats: ["1-Box Gridiron & 7-on-7 Bundles", "Helmets, Visors & Shoulder Pads", "Sticky Receiver Gloves & Cleat Gear", "QB Target Nets, Sleds & Agility Ladders"] },
  { slug: "atvs-offroad", label: "ATVs, UTVs & Four-Wheeler Off-Road", zipEvent: "ATV Mud Parks, Public OHV Trails, Weekend Rides & Powersports Shops", img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600", cats: ["1-Box Trail Recovery & Winch Bundles", "Heavy-Duty Winches, Tow Straps & Hitches", "LED Light Bars, Whip Lights & Audio", "DOT Motocross Helmets, Goggles & Cargo Boxes"] },
  { slug: "basketball", label: "Basketball Hoops & Court Lab", zipEvent: "AAU Weekend Tournaments, Indoor Hardwood Courts & Shooting Labs", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600", cats: ["1-Box Home Court & Team Bundles", "Portable & In-Ground Tempered Glass Hoops", "Official Leather Game Balls & Ball Racks", "Shot Return Nets, Dribble Goggles & Vert Mats"] },
  { slug: "golf-pickleball", label: "Golf & Carbon Pickleball Plaza", zipEvent: "Public Golf Courses, Driving Ranges & Weekend Pickleball Tournaments", img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600", cats: ["1-Box Golf & 4-Player Pickleball Bundles", "Raw Carbon Fiber Pickleball Paddles & Nets", "Complete Golf Club Sets, Drivers & Putters", "Laser Rangefinders, Launch Monitors & Putting Greens"] },
  { slug: "combat-fitness", label: "Boxing, MMA & Strength Conditioning", zipEvent: "Boxing/MMA Gyms, Amateur Fight Nights & Strength Conditioning Clubs", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600", cats: ["1-Box Home Gym & Fighter Bundles", "Leather Boxing Gloves, Wraps & Headgear", "Heavy Punching Bags, Speed Bags & Stands", "Adjustable Dumbbells, Kettlebells & Massage Guns"] }
];

fs.mkdirSync("app/data", { recursive: true });

for (const s of SPORTS) {
  const list = [];
  for (let i = 0; i < 60; i++) {
    const catIdx = i < 15 ? 0 : (i < 30 ? 1 : (i < 45 ? 2 : 3));
    const isB = catIdx === 0;
    const p = i < 20 ? Number((18.99 + i * 1.05).toFixed(2)) : (i < 42 ? Number((44.99 + (i - 20) * 3.25).toFixed(2)) : Number((124.99 + (i - 42) * 11.00).toFixed(2)));
    const comp = Number((p * 1.18).toFixed(2));
    const cnt = i < 18 ? 3 : (i < 38 ? 8 : 22);
    list.push({
      id: "SFLIX-" + s.slug.toUpperCase() + "-" + (i + 1),
      storeRoute: "/sportsflix/" + s.slug,
      sportSlug: s.slug,
      sportTitle: s.label,
      zipEventLabel: s.zipEvent,
      deptId: "cat-" + catIdx,
      deptLabel: s.cats[catIdx],
      isCuratedBundle: isB,
      priceBand: p < 40 ? "low" : (p <= 120 ? "mid" : "high"),
      count: cnt,
      name: isB ? "[1-Box Pro Team Bundle • Save $15] " + s.label + " " + s.cats[catIdx] + " #" + (i + 1) : s.label + " — " + s.cats[catIdx] + " Pro Model #" + (i + 1),
      price: "$" + p.toFixed(2),
      competitorPrice: "$" + comp.toFixed(2),
      savings: "Save $" + (comp - p).toFixed(2) + " Below Sporting Goods Retail",
      media: [s.img, s.img, s.img],
      video: true,
      trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      specs: {
        manufacturer: "SPORTSFLIX Pro Direct • Insured ($2M Liability)",
        condition: isB ? "Pre-Built Single-Warehouse Sport Bundle (Ships Together in 1 Box)" : "Brand New Pro-Grade Gear • 3+ Photos, Video & Spec Sheet",
        shipping: "Base Insured Shipping + 8.25% Tax & Card Fee at Checkout"
      }
    });
  }
  fs.writeFileSync("app/data/sportsflix-" + s.slug + ".ts", "export const sportItems = " + JSON.stringify(list, null, 2) + ";\n", "utf8");
}
console.log("✅ STEP 1 COMPLETE: All 6 Individual SPORTSFLIX Data Files Created (360 Pro Items)!");

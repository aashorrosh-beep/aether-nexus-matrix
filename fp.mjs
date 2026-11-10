import fs from "fs";
const f = "app/stores/christmas-store/christmas-inventory.ts";
const r = fs.readFileSync(f, "utf8"), i = r.indexOf("export const CHRISTMAS_INVENTORY");
const a = JSON.parse(r.slice(r.indexOf("[", i), r.lastIndexOf("]") + 1));
for (const x of a) {
const c = x.name.replace(/\(.*?\)/g, "").trim();
const u = (s, n) => `https://tse${n}.mm.bing.net/th?q=${encodeURIComponent(c + " " + s)}&w=600&h=450&c=7&p=0`;
x.imgs = [u("product", 1), u("closeup", 2), u("retail", 3)];
}
fs.writeFileSync(f, r.slice(0, i) + "export const CHRISTMAS_INVENTORY: StandaloneXmasSKU[] = " + JSON.stringify(a) + ";\n");
console.log("OK:", a.length);

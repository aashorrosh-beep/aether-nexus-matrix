import datetime
import json
import subprocess
import urllib.request
from pathlib import Path

ROOT = Path(".").resolve()
LIVE_URL = "https://aether-nexus-matrix.vercel.app"

TARGETS = [
    {"name": "Shoe Store", "keys": ["shoe", "footwear", "boot", "sneaker"]},
    {"name": "Music Store / Music Town", "keys": ["music", "vinyl", "audio", "kiosk", "cd"]},
    {"name": "Emergency Superstore", "keys": ["emergency", "hurricane", "flood", "disaster", "prep"]},
]

def scan_local_routes():
    app_dir = ROOT / "app"
    pages = sorted(str(p.relative_to(ROOT)) for p in app_dir.rglob("page.*")) if app_dir.exists() else []
    passed, failed, matched_urls = [], [], {}

    for t in TARGETS:
        hits = [p for p in pages if any(k in p.lower() for k in t["keys"])]
        if hits:
            passed.append(f"[LOCAL ROUTE FOUND] {t['name']} -> {', '.join(hits)}")
            # Convert app/<slug>/page.tsx -> /<slug>
            rel = Path(hits[0]).parent.relative_to("app")
            matched_urls[t["name"]] = "/" + str(rel).replace("\\", "/")
        else:
            failed.append(f"[MISSING LOCAL ROUTE] No page.tsx in app/ matched {t['name']} ({t['keys']})")

    # Check hub file (app/page.tsx)
    hub_file = next((p for p in app_dir.glob("page.*")), None)
    if hub_file:
        hub_txt = hub_file.read_text(encoding="utf-8", errors="ignore").lower()
        for t in TARGETS:
            if any(k in hub_txt for k in t["keys"]):
                passed.append(f"[WIRED IN LOCAL HUB] {t['name']} appears in {hub_file.name}")
            else:
                failed.append(f"[NOT ON LOCAL HUB] {t['name']} is missing from {hub_file.name} orbit ring!")
    return passed, failed, matched_urls, len(pages)

def scan_live_vercel(matched_urls):
    passed, failed = [], []
    try:
        req = urllib.request.Request(LIVE_URL, headers={"User-Agent": "ALBS-Crucible/1.0", "Cache-Control": "no-cache"})
        with urllib.request.urlopen(req, timeout=10) as r:
            html = r.read().decode("utf-8", errors="ignore").lower()
            for t in TARGETS:
                if any(k in html for k in t["keys"]):
                    passed.append(f"[LIVE ON VERCEL HUB] {t['name']} is visible on {LIVE_URL}")
                else:
                    failed.append(f"[HIDDEN ON VERCEL HUB] {t['name']} is NOT rendered on {LIVE_URL}")
    except Exception as e:
        failed.append(f"[VERCEL UNREACHABLE] {e}")

    for name, route in matched_urls.items():
        url = f"{LIVE_URL}{route}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "ALBS-Crucible/1.0"})
            with urllib.request.urlopen(req, timeout=8) as r:
                if r.status == 200:
                    passed.append(f"[LIVE 200 OK] {name} route works live at {url}")
        except Exception as e:
            failed.append(f"[LIVE ROUTE 404/FAIL] {url} -> {e}")

    return passed, failed

def crucible_blueprint_and_git_check():
    passed, blocks = [], []
    bp = ROOT / "ALBS_MASTER_SITE_BLUEPRINT.json"
    if bp.exists():
        try:
            raw = bp.read_text(encoding="utf-8", errors="ignore")
            data = json.loads(raw)
            passed.append(f"[BLUEPRINT INTACT] ALBS_MASTER_SITE_BLUEPRINT.json valid JSON ({bp.stat().st_size:,} bytes)")
            low = raw.lower()
            if "undefined" in low or '"image": ""' in low:
                blocks.append("[DEAD MEDIA WARNING] Empty or 'undefined' image refs detected in blueprint.")
        except Exception as e:
            blocks.append(f"[CORRUPT BLUEPRINT JSON] {e}")

    # Check unpushed commits or uncommitted changes
    status = subprocess.getoutput("git status --porcelain").strip()
    unpushed = subprocess.getoutput("git log @{u}.. --oneline 2>/dev/null").strip()
    if status:
        blocks.append(f"[UNCOMMITTED CHANGES] Local edits not committed to Git yet ({len(status.splitlines())} files)")
    else:
        passed.append("[GIT CLEAN] Working tree is clean.")
    if unpushed:
        blocks.append(f"[UNPUSHED COMMITS] Local commits waiting to push to Vercel:\n    " + "\n    ".join(unpushed.splitlines()))
    else:
        passed.append("[GIT SYNCED] Local branch matches remote.")
    return passed, blocks

def main():
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    p1_ok, p1_fail, urls, total_pages = scan_local_routes()
    p2_ok, p2_fail = scan_live_vercel(urls)
    c_ok, c_block = crucible_blueprint_and_git_check()

    verdict = "PASS - ALL 3 WINGS LIVE" if not (p1_fail or p2_fail or c_block) else "ACTION REQUIRED - SEE EXACT ITEMS BELOW"
    lines = [
        "==============================================================",
        f" ALBS NEXUS DOUBLE-TEST, CRUCIBLE & AUDIT ({now})",
        f" Total Local App Pages Scanned: {total_pages}",
        f" VERDICT: {verdict}",
        "==============================================================",
        "\n[1] PASS 1: LOCAL APP ROUTES & HUB WIRING",
        *[f"  OK  : {x}" for x in p1_ok],
        *[f"  FIX : {x}" for x in p1_fail],
        "\n[2] PASS 2: LIVE VERCEL DOUBLE-TEST",
        *[f"  OK  : {x}" for x in p2_ok],
        *[f"  FIX : {x}" for x in p2_fail],
        "\n[3] CRUCIBLE: BLUEPRINT, MEDIA & GIT DEPLOYMENT SYNC",
        *[f"  OK  : {x}" for x in c_ok],
        *[f"  GATE: {x}" for x in c_block],
        "=============================================================="
    ]
    report = "\n".join(lines)
    (ROOT / "mall_crucible_audit.md").write_text(report + "\n", encoding="utf-8")
    print(report)

if __name__ == "__main__":
    main()

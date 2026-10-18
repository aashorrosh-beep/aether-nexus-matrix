import fs from 'fs';

const now = new Date();
const reconEnd = new Date('2026-11-03T00:00:00-06:00');
const bfCountdownStart = new Date('2026-11-18T00:00:00-06:00'); // 9 days before Black Friday (Day 10 = Nov 27)
const blackFridayDate = new Date('2026-11-27T00:00:00-06:00');  // Day 10 Peak + Cyber Weekend Kickoff
const cyberMondayEnd = new Date('2026-12-01T00:00:00-06:00');   // Ends after Cyber Monday (Nov 30)

let phase = 'PHASE 1: 15-DAY CUSTOMER & COMPETITOR RECON (OCT 18 – NOV 2)';
let banner = '📡 LIVE RECON & EARLY HOLIDAY ACCESS • 81 Storefronts Stocked • 10%–20% Price-Beat Sanctuary';

if (now >= reconEnd && now < bfCountdownStart) {
  phase = 'PHASE 2: DOORBUSTER SUPPLY LOCK & PRE-THANKSGIVING STAGING (NOV 3 – NOV 17)';
  banner = '⚡ PRE-THANKSGIVING DOORBUSTER STAGING ACTIVE • Early VIP Access Across All 81 Storefronts';
} else if (now >= bfCountdownStart && now < blackFridayDate) {
  const dayNum = Math.min(9, Math.floor((now - bfCountdownStart) / (1000 * 60 * 60 * 24)) + 1);
  phase = 'PHASE 3: 10-DAY BLACK FRIDAY COUNTDOWN — DAY ' + dayNum + ' OF 10 (NOV 18 – NOV 26)';
  banner = '🔥 BLACK FRIDAY 10-DAY COUNTDOWN (DAY ' + dayNum + ' OF 10): Daily Doorbusters Live Now!';
} else if (now >= blackFridayDate && now < cyberMondayEnd) {
  phase = 'PHASE 4: DAY 10 BLACK FRIDAY PEAK + 4-DAY CYBER MONDAY BLITZ (FRI NOV 27 – MON NOV 30)';
  banner = '🚨 BLACK FRIDAY & 4-DAY CYBER MONDAY BLOWOUT LIVE NOW (FRI • SAT • SUN • MON)!';
}

const statusReport = {
  timestamp: now.toISOString(),
  active_phase: phase,
  live_banner: banner,
  schedule: {
    recon_window: 'Oct 18 – Nov 2, 2026 (15 Days: Customer & Competitor Trend Tracking)',
    staging_window: 'Nov 3 – Nov 17, 2026 (Supply Commitment & Press Release Drop)',
    ten_day_bf_blitz: 'Nov 18 – Nov 27, 2026 (9-Day Countdown -> Day 10 Black Friday Finale)',
    four_day_cyber_monday: 'Fri Nov 27, Sat Nov 28, Sun Nov 29 & Mon Nov 30, 2026'
  }
};

fs.writeFileSync('public/bfcm-campaign-state.json', JSON.stringify(statusReport, null, 2), 'utf8');
console.log('==================================================================');
console.log('🗓️ ALBS NOVEMBER BLACK FRIDAY & CYBER MONDAY SCHEDULER ARMED');
console.log('   Current Active Phase: ' + phase);
console.log('   10-Day BF Countdown:  Wed Nov 18 -> Fri Nov 27, 2026 (Day 10)');
console.log('   4-Day Cyber Blitz:    Fri Nov 27, Sat Nov 28, Sun Nov 29 & Mon Nov 30');
console.log('==================================================================');

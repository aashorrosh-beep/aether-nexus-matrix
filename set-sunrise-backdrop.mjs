import fs from 'fs';
import path from 'path';

// 1. Find and neutralize the floating ticker-tape overlay in app/layout.tsx or components
function cleanTicker(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanTicker(full);
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(entry.name)) {
      let c = fs.readFileSync(full, 'utf8');
      if (c.includes('THE TELEPHONE') || c.includes('DYSON SPHERE INITIATIVE') || c.includes('HOLOGRAPHIC COMMERCE')) {
        console.log('🧹 Found floating ticker-tape in: ' + full);
        if (full.endsWith('layout.tsx')) {
          // Keep clean layout wrapper + inject the Mountain Sunrise ambient background
          const sunriseLayout = [
            'import "./globals.css";',
            'export const metadata = {',
            '  title: "ALBS NEXUS | The Global Mall of Malls",',
            '  description: "80+ Interactive Storefronts • Nostalgia, Matrix, Vitality & The Autism/New Life Family Sanctuary"',
            '};',
            'export default function RootLayout({ children }: { children: React.ReactNode }) {',
            '  return (',
            '    <html lang="en">',
            '      <body className="bg-black text-white antialiased relative min-h-screen overflow-x-hidden">',
            '        {/* NEW DAY, NEW FREEDOM: GOLDEN MOUNTAIN SUNRISE AMBIENT BACKDROP */}',
            '        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">',
            '          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-amber-900/20 to-black" />',
            '          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-gradient-radial from-amber-300/25 via-orange-500/10 to-transparent blur-3xl" />',
            '          <svg className="absolute bottom-0 left-0 w-full h-[38vh] opacity-35" viewBox="0 0 1440 320" preserveAspectRatio="none">',
            '            <path fill="#f59e0b" fillOpacity="0.18" d="M0,224L120,192C240,160,480,96,720,112C960,128,1200,224,1320,256L1440,288L1440,320L0,320Z" />',
            '            <path fill="#09090b" d="M0,256L180,160L360,240L580,96L820,224L1080,112L1290,208L1440,144L1440,320L0,320Z" />',
            '          </svg>',
            '        </div>',
            '        <div className="relative z-10">{children}</div>',
            '      </body>',
            '    </html>',
            '  );',
            '}'
          ].join('\n');
          fs.writeFileSync(full, sunriseLayout + '\n', 'utf8');
          console.log('🌅 Replaced ticker-tape in app/layout.tsx with the Golden Mountain Sunrise Backdrop!');
        } else {
          // If ticker was in a separate component, hide it cleanly
          c = c.replace(/1876: THE TELEPHONE/g, '').replace(/2050: DYSON SPHERE INITIATIVE/g, '');
          fs.writeFileSync(full, c, 'utf8');
        }
      }
    }
  }
}

cleanTicker('app');

// Make main background semi-transparent in app/page.tsx so the Mountain Sunrise glows through behind the cards
let page = fs.readFileSync('app/page.tsx', 'utf8');
page = page.replace('min-h-screen bg-black text-white', 'min-h-screen bg-transparent text-white');
fs.writeFileSync('app/page.tsx', page, 'utf8');
console.log('✅ [SUNRISE LOCKED] Floating ticker tape removed & Mountain Sunrise shining behind the Mall!');

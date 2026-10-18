import fs from 'fs';

const subject = 'Free 12-Mile Autism & Special Ed Field Trip / Event Finder for Families & Schools';
const body = [
  'Hi there,',
  '',
  'Through our own personal experience with friends and family raising children on the spectrum—including my own granddaughter, who is mildly on the spectrum—we know how challenging it is for parents and Special Education teachers to plan a peaceful outing or school field trip.',
  '',
  'Because of that, we built ALBS Nexus (https://www.albsnexus.com) and our free Autism & Family Sanctuary:',
  'https://www.albsnexus.com/spectrum-knowledge-vault.html',
  '',
  '1. Free 12-Mile ZIP Code Event & Special Ed Field Trip Radar: Parents, Special Ed departments, and hospitals anywhere in the US can enter their ZIP code to find multiple sensory-friendly venues, quiet museums, and all-abilities parks within a 12-mile radius.',
  '2. Printable 2026 Hospital Research Vault: Plain-English clinical briefings for doctor visits.',
  '3. Hard-to-Find Sensory Superstore (10%-20% Below Specialty Catalogs): 140+ sensory & classroom items (300lb swings, crash pads, safety beds, AAC talkers), with 3% of all mall sales supporting Texas Children s Hospital, our Autism Fund & Veterans.',
  '',
  'Please feel free to share this free tool with your families, teachers, or hospital resource boards—and let us know if there are any items or local venues you would like us to add!',
  '',
  'Warm regards,',
  'Anthony Shorrosh',
  'Founder, ALBS Nexus & The Shorrosh Family Foundation',
  'https://www.albsnexus.com/spectrum-knowledge-vault.html'
].join('\n');

const html = [
  '<!DOCTYPE html><html><head><meta charset="utf-8"><title>ALBS Autism, School & Hospital Outreach Hub</title>',
  '<style>body{background:#09090b;color:#fff;font-family:sans-serif;padding:24px;max-width:960px;margin:0 auto}.card{background:#18181b;border:2px solid #10b981;padding:20px;border-radius:12px;margin:14px 0}pre{background:#000;padding:14px;border-radius:8px;white-space:pre-wrap;font-family:sans-serif;line-height:1.5}button,a.btn{background:#10b981;color:#000;font-weight:900;padding:10px 16px;border-radius:8px;text-decoration:none;border:none;cursor:pointer;display:inline-block;margin:4px;font-size:12px;text-transform:uppercase}</style></head><body>',
  '<h1>💌 ALBS Autism, Special Ed & Hospital Outreach Hub</h1><a class="btn" href="/">← Back to Mall</a>',
  '<div class="card"><h3>Founder s Letter (For Autism Groups, Special Ed Field Trips & Hospitals)</h3><pre id="b">' + body + '</pre>',
  '<button onclick="navigator.clipboard.writeText(document.getElementById(\'b\').innerText);this.innerText=\'✅ COPIED!\'">📋 Copy Letter</button>',
  '<a class="btn" style="background:#38bdf8" target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body) + '">📧 Open in Gmail Compose →</a></div>',
  '<div id="list"></div><script>',
  'const su=' + JSON.stringify(subject) + ',bd=' + JSON.stringify(body) + ';',
  'const orgs=[',
  '{n:"Autism Society of Texas (Statewide Chapters)",e:"info@texasautismsociety.org"},',
  '{n:"Hope For Three — Houston / Cypress Autism Advocates",e:"info@hopeforthree.org"},',
  '{n:"The Arc of Texas (Special Ed & Family Network)",e:"info@thearcoftexas.org"},',
  '{n:"Texas Parent to Parent (Hospital & School Resource Network)",e:"info@txp2p.org"},',
  '{n:"Autism Society of America (National Directory)",e:"info@autism-society.org"}',
  '];',
  'document.getElementById("list").innerHTML=orgs.map(o=>"<div class=card><b>"+o.n+"</b> ("+o.e+")<br><a class=btn target=_blank href=\'https://mail.google.com/mail/?view=cm&fs=1&to="+o.e+"&su="+encodeURIComponent(su)+"&body="+encodeURIComponent(bd)+"\'>📧 1-Click Send in Gmail →</a></div>").join("");',
  '</script></body></html>'
].join('\n');

fs.writeFileSync('public/autism-outreach-kit.html', html, 'utf8');
console.log('✅ STEP 2 DONE: Built public/autism-outreach-kit.html!');

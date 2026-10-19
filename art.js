/* One Arise: card illustrations. Hand-drawn vector scenes that follow the active palette. */
(function () {
  'use strict';
  const f = n => Math.round(n * 10) / 10;
  const spark = (x, y, s) => 'M' + x + ' ' + (y - s) + 'L' + f(x + s * .28) + ' ' + f(y - s * .28) + 'L' + (x + s) + ' ' + y + 'L' + f(x + s * .28) + ' ' + f(y + s * .28) + 'L' + x + ' ' + (y + s) + 'L' + f(x - s * .28) + ' ' + f(y + s * .28) + 'L' + (x - s) + ' ' + y + 'L' + f(x - s * .28) + ' ' + f(y - s * .28) + 'Z';
  const star = (cx, cy, R, r) => { r = r || R * .45; let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r : R; d += (i ? 'L' : 'M') + f(cx + q * Math.cos(a)) + ' ' + f(cy + q * Math.sin(a)); } return d + 'Z'; };
  const gear = (cx, cy, R, n, ph) => {
    const step = Math.PI * 2 / n, r0 = R * 0.84; let d = '';
    for (let i = 0; i < n; i++) {
      const a = (ph || 0) + i * step;
      [[a - 0.3 * step, r0], [a - 0.17 * step, R], [a + 0.17 * step, R], [a + 0.3 * step, r0]].forEach((p, k) => { d += (i === 0 && k === 0 ? 'M' : 'L') + f(cx + p[1] * Math.cos(p[0])) + ' ' + f(cy + p[1] * Math.sin(p[0])) + ' '; });
    }
    return d + 'Z';
  };
  const ticks = (cx, cy, r1, r2, n) => { let d = ''; for (let i = 0; i < n; i++) { const a = i * Math.PI * 2 / n; d += 'M' + f(cx + r1 * Math.cos(a)) + ' ' + f(cy + r1 * Math.sin(a)) + 'L' + f(cx + r2 * Math.cos(a)) + ' ' + f(cy + r2 * Math.sin(a)); } return d; };
  const SV = inner => '<svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' + inner + '</svg>';
  const GLOW = '<ellipse class="glow" cx="320" cy="172" rx="260" ry="152"/>';
  const person = (x, y, k) => '<g transform="translate(' + x + ' ' + y + ')"><circle class="gl" r="' + (22 * (k || 1)) + '"/><circle class="s2" cy="' + (-5 * (k || 1)) + '" r="' + (6 * (k || 1)) + '"/><path class="s2" d="M' + (-12 * (k || 1)) + ' ' + (12 * (k || 1)) + 'c0-' + (12 * (k || 1)) + ' ' + (24 * (k || 1)) + '-' + (12 * (k || 1)) + ' ' + (24 * (k || 1)) + ' 0"/></g>';
  const bolt = (x, y, k) => '<path class="fg" transform="translate(' + x + ' ' + y + ') scale(' + (k || 1) + ')" d="M14 0L-4 28H8L2 52L26 20H13L22 0Z"/>';

  const S = {
    studio() {
      const N = [[320, 118], [270, 138], [372, 138], [246, 176], [396, 176], [292, 170], [348, 170], [320, 152], [274, 102], [366, 102], [320, 86], [300, 198], [340, 198], [256, 128], [386, 128], [222, 150], [420, 150]];
      let e = ''; for (let i = 0; i < N.length; i++) for (let j = i + 1; j < N.length; j++) { if (Math.hypot(N[i][0] - N[j][0], N[i][1] - N[j][1]) < 62) e += 'M' + N[i][0] + ' ' + N[i][1] + 'L' + N[j][0] + ' ' + N[j][1]; }
      const nodes = N.map((p, i) => '<circle class="fa2' + (i % 4 === 0 ? ' pu' : '') + '" cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i === 7 ? 8 : 4) + '"/>').join('');
      return SV(GLOW +
        '<ellipse class="gl" cx="320" cy="270" rx="142" ry="24"/><ellipse class="s2" cx="320" cy="263" rx="96" ry="14"/><path class="s2 dsh" d="M320 208V252"/>' +
        '<ellipse class="s1 dim" cx="321" cy="146" rx="106" ry="78" stroke-dasharray="2 7"/>' +
        '<path class="s1" d="' + e + '"/>' + nodes +
        '<g class="fl"><rect class="gl" x="58" y="112" width="140" height="116" rx="14"/><rect class="s1" x="76" y="130" width="34" height="20" rx="5"/><path class="s1" d="M110 140H132V176H146"/><rect class="s1" x="146" y="166" width="34" height="20" rx="5"/><rect class="s1" x="76" y="196" width="34" height="20" rx="5"/><path class="s1" d="M110 206H146"/></g>' +
        '<g class="fl fl2"><rect class="gl" x="442" y="112" width="140" height="116" rx="14"/><circle class="s1" cx="472" cy="142" r="11"/><path class="s1" d="M483 142H516"/><circle class="s1" cx="527" cy="142" r="11"/><path class="s2" d="M462 206L488 188L512 196L540 168L566 154"/><circle class="fa2" cx="566" cy="154" r="4"/></g>' +
        '<path class="fa2 pu" d="' + spark(112, 70, 9) + '"/><path class="fa2 pu" d="' + spark(540, 74, 7) + '"/><path class="fa2 pu" d="' + spark(330, 40, 6) + '"/><path class="fa2 pu" d="' + spark(70, 296, 5) + '"/>');
    },
    selfrun() {
      return SV(GLOW +
        '<path class="s2 dsh dim" d="M120 62C210 18 430 18 520 58"/>' +
        '<g class="sp"><path class="gl" d="' + gear(300, 196, 78, 14, 0) + '"/><circle class="s1" cx="300" cy="196" r="44"/><circle class="fg" cx="300" cy="196" r="14"/><path class="s1 dim" d="M300 152V240M256 196H344"/></g>' +
        '<g class="sp sp2"><path class="gl" d="' + gear(410, 114, 50, 9, 0.2) + '"/><circle class="s1" cx="410" cy="114" r="26"/><circle class="fg" cx="410" cy="114" r="9"/></g>' +
        '<g class="sp sp2"><path class="gl" d="' + gear(206, 120, 38, 8, 0.1) + '"/><circle class="s1" cx="206" cy="120" r="19"/><circle class="fg" cx="206" cy="120" r="7"/></g>' +
        '<path class="s2 dsh" d="M96 276C190 338 450 338 544 262"/><path class="s2" d="M530 248l16 14-22 4"/>' +
        '<g class="fl"><rect class="gl" x="470" y="196" width="76" height="42" rx="11"/><path class="s2" d="M490 218l8 8 16-18"/></g>' +
        '<g class="fl fl2"><rect class="gl" x="84" y="214" width="76" height="42" rx="11"/><path class="s1" d="M102 228h40M102 240h26"/></g>' +
        '<path class="fa2 pu" d="' + spark(520, 110, 8) + '"/><path class="fa2 pu" d="' + spark(110, 60, 6) + '"/>');
    },
    team() {
      const card = (x, y, w, h, cls) => '<g class="fl ' + (cls || '') + '"><rect class="gl" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12"/><circle class="fg" cx="' + (x + 22) + '" cy="' + (y + h / 2) + '" r="9"/><path class="ck" stroke-width="2.4" d="M' + (x + 17) + ' ' + (y + h / 2) + 'l4 4 8-9"/><path class="s1" d="M' + (x + 40) + ' ' + (y + h / 2 - 7) + 'h' + (w - 56) + 'M' + (x + 40) + ' ' + (y + h / 2 + 7) + 'h' + (w - 78) + '"/></g>';
      return SV(GLOW +
        '<rect class="gl" x="90" y="258" width="460" height="14" rx="7"/><path class="s1 dim" d="M130 272V314M510 272V314"/>' +
        '<circle class="fg" cx="240" cy="168" r="20"/><path class="gl" d="M196 258c0-42 22-62 44-62s44 20 44 62z"/>' +
        '<circle class="fg" cx="400" cy="164" r="20"/><path class="gl" d="M356 258c0-42 22-62 44-62s44 20 44 62z"/>' +
        '<rect class="gl" x="284" y="208" width="72" height="44" rx="6"/><path class="s2" d="M296 222h32M296 232h48"/><path class="gl" d="M274 258h92l-6-8h-80z"/>' +
        card(70, 66, 100, 54, '') + card(136, 142, 86, 46, 'fl2') + card(468, 60, 100, 54, 'fl2') + card(512, 138, 86, 46, '') +
        '<path class="s2 dsh dim" d="M170 106C204 118 224 138 234 150M468 98C440 118 422 138 410 148"/>' +
        '<path class="fa2 pu" d="' + spark(318, 70, 8) + '"/><path class="fa2 pu" d="' + spark(580, 250, 6) + '"/>');
    },
    reply() {
      return SV(GLOW +
        '<rect class="gl" x="254" y="30" width="132" height="292" rx="26"/><rect class="s1 dim" x="264" y="46" width="112" height="260" rx="18"/><rect class="fa dim" x="304" y="38" width="32" height="5" rx="2.5"/>' +
        '<rect class="s1" x="274" y="72" width="64" height="22" rx="9"/><rect class="fg" x="296" y="104" width="70" height="22" rx="9"/><rect class="s1" x="274" y="136" width="52" height="22" rx="9"/><rect class="fg" x="306" y="168" width="60" height="22" rx="9"/>' +
        '<g class="fl"><rect class="gl" x="56" y="84" width="150" height="66" rx="18"/><path class="gl" d="M176 150l16 20 6-20z"/>' + bolt(78, 96, 0.9) + '<path class="s1" d="M122 108h60M122 126h42"/></g>' +
        '<g class="fl fl2"><rect class="gl" x="72" y="194" width="126" height="54" rx="16"/><path class="gl" d="M104 248l-16 18 30-6z"/>' + bolt(90, 202, 0.7) + '<path class="s1" d="M124 214h56M124 230h36"/></g>' +
        '<g class="fl fl2"><rect class="gl" x="436" y="70" width="144" height="60" rx="18"/><path class="gl" d="M466 130l-14 18 26-6z"/><circle class="fg" cx="462" cy="100" r="10"/><path class="ck" stroke-width="2.4" d="M456 100l4 4 8-9"/><path class="s1" d="M482 94h72M482 108h50"/></g>' +
        '<g class="fl"><rect class="gl" x="448" y="170" width="124" height="58" rx="16"/><path class="gl" d="M540 228l16 18 4-18z"/>' + bolt(468, 178, 0.75) + '<path class="s1" d="M512 192h42M512 208h30"/></g>' +
        '<path class="s2 dsh" d="M206 118H254M198 222H254M386 100H436M386 200H448"/>' +
        '<path class="fa2 pu" d="' + spark(240, 52, 7) + '"/><path class="fa2 pu" d="' + spark(410, 300, 6) + '"/>');
    },
    booking() {
      let dots = ''; for (let c = 0; c < 5; c++) for (let r = 0; r < 3; r++) { if (c === 2 && r === 1) continue; dots += '<circle class="fa dim" cx="' + (222 + c * 49) + '" cy="' + (150 + r * 44) + '" r="5"/>'; }
      return SV(GLOW +
        '<rect class="gl" x="176" y="62" width="288" height="236" rx="20"/><path class="gl" d="M176 82a20 20 0 0 1 20-20h248a20 20 0 0 1 20 20v30H176z"/>' +
        '<rect class="fg" x="236" y="48" width="10" height="28" rx="5"/><rect class="fg" x="394" y="48" width="10" height="28" rx="5"/><path class="s2" d="M204 94h72"/><path class="s1 dim" d="M204 106h46"/>' + dots +
        '<circle class="fg" cx="320" cy="194" r="22"/><path class="ck" d="M310 194l7 7 14-15"/><circle class="s2 rg" cx="320" cy="194" r="22"/>' +
        '<g class="fl"><circle class="gl" cx="508" cy="250" r="52"/><circle class="s1 dim" cx="508" cy="250" r="42"/><path class="s1 dim thin" d="' + ticks(508, 250, 36, 42, 12) + '"/><path class="s2" d="M508 250V222M508 250L528 262"/><circle class="fa2" cx="508" cy="250" r="4"/></g>' +
        '<path class="s2 dsh dim" d="M464 226C474 236 486 240 456 252"/><path class="s2 dsh" d="M362 214C410 246 440 254 456 252"/>' +
        '<path class="fa2 pu" d="' + spark(110, 96, 9) + '"/><path class="fa2 pu" d="' + spark(130, 270, 6) + '"/><path class="fa2 pu" d="' + spark(552, 80, 7) + '"/>');
    },
    records() {
      return SV(GLOW +
        '<rect class="gl" x="70" y="196" width="176" height="96" rx="14" opacity=".55"/><rect class="gl" x="86" y="152" width="176" height="96" rx="14" opacity=".8"/>' +
        '<rect class="gl" x="102" y="108" width="176" height="96" rx="14"/><circle class="s2" cx="136" cy="140" r="15"/><path class="s2" d="M118 176c0-20 36-20 36 0"/><path class="s1" d="M172 130h86M172 148h60M172 166h72"/>' +
        '<path class="gl" d="M396 98V250a74 22 0 0 0 148 0V98z"/><ellipse class="gl" cx="470" cy="98" rx="74" ry="22"/><path class="s1" d="M396 152a74 22 0 0 0 148 0M396 206a74 22 0 0 0 148 0"/>' +
        '<circle class="fg pu" cx="520" cy="128" r="4"/><circle class="fg pu" cx="520" cy="182" r="4"/><circle class="fg pu" cx="520" cy="236" r="4"/>' +
        '<path class="s2 dsh" d="M278 156C330 156 350 134 396 134M262 214C320 222 350 196 396 190M246 262C320 272 350 246 396 244"/>' +
        '<circle class="fa2" cx="396" cy="134" r="3.5"/><circle class="fa2" cx="396" cy="190" r="3.5"/><circle class="fa2" cx="396" cy="244" r="3.5"/>' +
        '<path class="fa2 pu" d="' + spark(330, 56, 8) + '"/><path class="fa2 pu" d="' + spark(570, 320, 6) + '"/>');
    },
    reminders() {
      const bell = 'M320 66C270 66 246 104 246 150V196C246 214 234 226 216 238H424C406 226 394 214 394 196V150C394 104 370 66 320 66Z';
      return SV(GLOW +
        '<circle class="s2 rg" cx="320" cy="170" r="110"/><circle class="s2 rg rg2" cx="320" cy="170" r="110"/><circle class="s2 rg rg3" cx="320" cy="170" r="110"/>' +
        '<g class="fl"><path class="fg" d="' + bell + '"/><path class="s2" d="' + bell + '"/><path d="M276 104C262 124 260 160 262 196" stroke="#fff" stroke-opacity=".35" stroke-width="4" fill="none" stroke-linecap="round"/><path class="fg" d="M296 248a24 24 0 0 0 48 0z"/><circle class="fg" cx="320" cy="58" r="8"/>' +
        '<circle class="fa2 pu" cx="382" cy="96" r="13"/><circle class="s2 rg" cx="382" cy="96" r="13"/></g>' +
        '<g class="fl fl2"><circle class="gl" cx="124" cy="250" r="40"/><path class="s1 dim thin" d="' + ticks(124, 250, 31, 36, 12) + '"/><path class="s2" d="M124 250V226M124 250L142 259"/><circle class="fa2" cx="124" cy="250" r="3.5"/></g>' +
        '<g class="fl"><rect class="gl" x="470" y="212" width="112" height="60" rx="14"/><circle class="fg" cx="496" cy="242" r="11"/><path class="ck" stroke-width="2.4" d="M490 242l4 4 8-9"/><path class="s1" d="M516 235h50M516 251h34"/></g>' +
        '<path class="fa2 pu" d="' + spark(100, 90, 8) + '"/><path class="fa2 pu" d="' + spark(548, 70, 7) + '"/>');
    },
    billing() {
      const coin = c => '<path class="gl" d="M86 ' + c + 'v12a34 12 0 0 0 68 0v-12z"/><ellipse class="fg" cx="120" cy="' + c + '" rx="34" ry="12"/>';
      return SV(GLOW +
        '<g transform="rotate(-9 260 190)"><g class="fl"><rect class="gl" x="150" y="108" width="228" height="140" rx="20"/><rect class="fg" x="176" y="142" width="46" height="34" rx="8"/><path class="ck" stroke-width="1.4" d="M176 159h46M199 142v34"/><path class="s2" d="M330 150a12 12 0 0 1 0 24M340 142a22 22 0 0 1 0 40M350 134a32 32 0 0 1 0 56"/><path class="s1" d="M176 206h40M228 206h40M280 206h40"/></g></g>' +
        '<g class="fl fl2"><rect class="gl" x="404" y="62" width="150" height="214" rx="16"/><path class="s1" d="M428 96h66M428 116h100M428 136h100M428 156h70"/><path class="s2" d="M428 196h102"/><circle class="fg" cx="479" cy="238" r="18"/><path class="ck" d="M469 238l7 7 14-15"/></g>' +
        coin(298) + coin(284) + coin(270) +
        '<path class="s2 dsh dim" d="M240 262C300 300 360 300 404 262"/>' +
        '<path class="fa2 pu" d="' + spark(104, 90, 8) + '"/><path class="fa2 pu" d="' + spark(580, 310, 6) + '"/>');
    },
    leads() {
      const parts = [[190, 40], [250, 26], [320, 38], [390, 24], [450, 42], [520, 30]].map((p, i) => '<circle class="fa2 pu" cx="' + p[0] + '" cy="' + p[1] + '" r="4"/>').join('');
      return SV(GLOW +
        parts + '<path class="s1 dsh dim" d="M250 32V60M320 44V62M390 30V60M450 46V62"/>' +
        '<path class="gl" d="M150 64H490L372 168V236L268 268V168Z"/><path class="s2 dim" d="M204 86H436M236 114H404M266 142H374"/><path class="s2 dsh" d="M320 170V256"/>' +
        '<path class="s2 dsh" d="M320 268C300 290 230 290 184 292M320 268V290M320 268C340 290 410 290 456 292"/>' +
        person(170, 314, 0.9) + person(320, 318, 1) + person(470, 314, 0.9) +
        '<circle class="s2 rg" cx="320" cy="318" r="22"/><circle class="s2 rg rg2" cx="170" cy="314" r="20"/><circle class="s2 rg rg3" cx="470" cy="314" r="20"/>' +
        '<path class="fa2 pu" d="' + spark(78, 160, 8) + '"/><path class="fa2 pu" d="' + spark(568, 190, 7) + '"/>');
    },
    reviews() {
      const st = [[170, 138, 30], [245, 128, 38], [320, 114, 48], [395, 128, 38], [470, 138, 30]].map((s, i) => '<g class="fl' + (i % 2 ? ' fl2' : '') + '"><path class="fg" d="' + star(s[0], s[1], s[2]) + '"/><path class="s2 thin" d="' + star(s[0], s[1], s[2]) + '"/></g>').join('');
      return SV(GLOW + st +
        '<g class="pu"><path class="gl" d="M320 306C262 268 244 242 244 218C244 196 260 182 278 182C296 182 310 192 320 206C330 192 344 182 362 182C380 182 396 196 396 218C396 242 378 268 320 306Z"/></g>' +
        person(104, 206, 0.9) + person(150, 296, 0.9) + person(536, 206, 0.9) + person(490, 296, 0.9) +
        '<path class="s2 dsh dim" d="M128 208C190 212 226 226 246 228M172 288C200 276 236 268 264 266M512 208C450 212 414 226 394 228M468 288C440 276 404 268 376 266"/>' +
        '<path class="fa2 pu" d="' + spark(90, 90, 8) + '"/><path class="fa2 pu" d="' + spark(556, 96, 7) + '"/>');
    },
    analytics() {
      const H = [48, 76, 64, 104, 132, 164]; let bars = '', pts = [], dots = '';
      H.forEach((h, i) => { const x = 150 + i * 56; bars += '<rect class="fg bar" style="animation-delay:' + (-i * 0.5) + 's" x="' + x + '" y="' + (264 - h) + '" width="34" height="' + h + '" rx="6"/>'; pts.push([x + 17, 264 - h - 14]); });
      const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join('');
      pts.forEach(p => { dots += '<circle class="fa2" cx="' + p[0] + '" cy="' + p[1] + '" r="4.5"/>'; });
      return SV(GLOW +
        '<rect class="gl" x="110" y="46" width="420" height="262" rx="20"/><path class="s1 dim thin" d="M138 120H502M138 168H502M138 216H502M138 264H502"/><path class="s2" d="M138 76h60"/><path class="s1 dim" d="M138 92h90"/>' +
        bars + '<path class="s2" stroke-width="2.4" d="' + path + '"/>' + dots +
        '<g class="fl"><rect class="gl" x="436" y="62" width="76" height="40" rx="10"/><path class="s2" d="M448 90L460 80L472 86L484 72L500 78"/></g>' +
        '<path class="fa2 pu" d="' + spark(76, 80, 8) + '"/><path class="fa2 pu" d="' + spark(570, 300, 6) + '"/>');
    }
  };
  const DEFS = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<linearGradient id="arG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" class="stA2"/><stop offset=".55" class="stA"/><stop offset="1" class="stG"/></linearGradient>' +
    '<linearGradient id="arGl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#fff" stop-opacity=".02"/></linearGradient>' +
    '<radialGradient id="arGw"><stop offset="0" class="stW0"/><stop offset="1" class="stW1"/></radialGradient></defs></svg>';
  const api = {
    svg(key) { return S[key] ? S[key]() : ''; },
    fill() { document.querySelectorAll('.c-art[data-art]').forEach(el => { if (!el.firstChild) el.innerHTML = api.svg(el.dataset.art); }); }
  };
  window.ARISE_ART = api;
  function init() { if (!document.getElementById('arG')) document.body.insertAdjacentHTML('afterbegin', DEFS); api.fill(); }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();

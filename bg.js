(function () {
  const html = document.documentElement, host = document.getElementById('bgfx');
  if (!host) return;
  const cv = document.getElementById('bgCanvas'), ctx = cv.getContext('2d');
  const OPTS = ['aurora', 'silk', 'dust', 'beams', 'off'];
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const phone = matchMedia('(max-width:760px)').matches;
  let mode = 'aurora', W = 0, H = 0, D = 1, raf = 0, last = 0, parts = [], AC = '207,174,106', lastW = innerWidth;
  const readAC = () => { AC = (getComputedStyle(html).getPropertyValue('--ac-rgb') || AC).trim() || AC; };
  const canvasMode = () => mode === 'silk' || mode === 'dust';
  function size() {
    D = Math.min(devicePixelRatio || 1, 1.5);
    W = cv.width = Math.round(innerWidth * D); H = cv.height = Math.round(innerHeight * D);
    parts = Array.from({ length: phone ? 16 : 34 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: (0.7 + Math.random() * 1.3) * D, a: 0.1 + Math.random() * 0.2, vx: (Math.random() - 0.5) * 0.05 * D, vy: -(0.03 + Math.random() * 0.07) * D, ph: Math.random() * 6.28, ac: Math.random() < 0.7 }));
    drawOnce();
  }
  function silk(t) {
    ctx.clearRect(0, 0, W, H);
    const step = 14 * D;
    for (let k = 0; k < 6; k++) {
      const base = H * (0.16 + k * 0.135), A1 = H * (0.028 + k * 0.006), A2 = H * 0.014;
      const f1 = (0.0011 + k * 0.00012) / D, f2 = (0.0027 - k * 0.0002) / D;
      const s1 = 0.12 + k * 0.018, s2 = 0.09 + k * 0.012, ph = k * 1.3;
      const path = new Path2D();
      for (let x = -step, first = true; x <= W + step; x += step) {
        const y = base + Math.sin(x * f1 + t * s1 + ph) * A1 + Math.sin(x * f2 - t * s2 + ph * 2) * A2;
        if (first) { path.moveTo(x, y); first = false; } else path.lineTo(x, y);
      }
      ctx.lineWidth = 5 * D; ctx.strokeStyle = 'rgba(' + AC + ',0.018)'; ctx.stroke(path);
      ctx.lineWidth = 1.1 * D; ctx.strokeStyle = 'rgba(' + AC + ',' + (0.07 + 0.012 * (k % 3)) + ')'; ctx.stroke(path);
    }
  }
  function dust(t, dt) {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.x += p.vx * dt * 60; p.y += p.vy * dt * 60;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      const tw = 0.65 + 0.35 * Math.sin(t * 0.6 + p.ph);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fillStyle = p.ac ? 'rgba(' + AC + ',' + (p.a * tw).toFixed(3) + ')' : 'rgba(255,255,255,' + (p.a * 0.7 * tw).toFixed(3) + ')';
      ctx.fill();
    }
  }
  function drawOnce() { if (!canvasMode()) { ctx.clearRect(0, 0, W, H); return; } const t = performance.now() / 1000; if (mode === 'silk') silk(t); else dust(t, 0); }
  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (document.hidden || now - last < 33) return;
    const dt = Math.min(0.1, (now - last) / 1000 || 0.033); last = now;
    if (mode === 'silk') silk(now / 1000); else dust(now / 1000, dt);
  }
  function sync() {
    cancelAnimationFrame(raf); raf = 0;
    if (canvasMode() && !reduce && html.dataset.quality !== 'light') { last = 0; raf = requestAnimationFrame(loop); } else drawOnce();
  }
  function setBg(m, user) {
    if (OPTS.indexOf(m) < 0) m = 'aurora';
    mode = m; html.dataset.bg = m; if (user) store.set('ap-bg', m);
    document.querySelectorAll('#segBg button').forEach(b => b.classList.toggle('on', b.dataset.bg === m));
    readAC(); sync();
  }
  const q = new URLSearchParams(location.search).get('bg');
  readAC(); size();
  setBg(OPTS.indexOf(q) >= 0 ? q : (store.get('ap-bg') || 'aurora'));
  document.querySelectorAll('#segBg button').forEach(b => b.addEventListener('click', () => setBg(b.dataset.bg, true)));
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (innerWidth !== lastW) { lastW = innerWidth; size(); } }, 200); });
  new MutationObserver(() => { readAC(); sync(); }).observe(html, { attributes: true, attributeFilter: ['data-palette', 'data-quality'] });
  document.addEventListener('visibilitychange', sync);
})();

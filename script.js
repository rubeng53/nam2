// ── EMOJIS FLOTANTES EN EL HERO ──
const foods = ['🍣','🌮','🍕','🍗','🍜','🥩','🍰','🥤','🍱','🌯','🍔','🌭','🫘','🥗'];
const fc = document.getElementById('floaters');

for (let i = 0; i < 14; i++) {
  const el = document.createElement('div');
  el.className = 'floater';
  el.textContent = foods[i % foods.length];
  el.style.left = (Math.random() * 95) + '%';
  el.style.animationDuration = (8 + Math.random() * 12) + 's';
  el.style.animationDelay = (Math.random() * 12) + 's';
  el.style.fontSize = (1.3 + Math.random() * 1.4) + 'rem';
  fc.appendChild(el);
}

// ── SCROLL REVEAL ──
const rvEls = document.querySelectorAll('.rv');
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('vis');
  });
}, { threshold: 0.1 });

rvEls.forEach(el => rvObs.observe(el));

// ── CONTADORES ANIMADOS ──
function animCount(el) {
  const target = parseFloat(el.dataset.target);
  const pre    = el.dataset.prefix || '';
  const suf    = el.dataset.suffix || '';
  const dec    = parseInt(el.dataset.dec || 0);
  const dur    = 1600;
  const steps  = 55;
  const inc    = target / steps;
  let cur = 0, cnt = 0;

  const t = setInterval(() => {
    cnt++;
    cur = Math.min(cur + inc, target);
    el.textContent = pre + (dec ? cur.toFixed(dec) : Math.floor(cur)) + suf;
    if (cnt >= steps) {
      clearInterval(t);
      el.textContent = pre + (dec ? target.toFixed(dec) : target) + suf;
    }
  }, dur / steps);
}

const cEls = document.querySelectorAll('.stat-n[data-target]');
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = '1';
      animCount(e.target);
    }
  });
}, { threshold: 0.3 });

cEls.forEach(c => cObs.observe(c));

// ── CONTADOR DEL PRECIO ──
let priceDone = false;
const pSec = document.getElementById('precio');
const pEl  = document.getElementById('pd');

const pObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !priceDone) {
      priceDone = true;
      let c = 0;
      const target = 269;
      const steps  = 55;

      const timer = setInterval(() => {
        c = Math.min(c + target / steps, target);
        pEl.textContent = Math.floor(c);
        if (c >= target) {
          clearInterval(timer);
          pEl.textContent = target;
        }
      }, 1600 / steps);
    }
  });
}, { threshold: 0.3 });

if (pSec) pObs.observe(pSec);

// ── TABS DEL MENÚ ──
function showTab(id, btn) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}

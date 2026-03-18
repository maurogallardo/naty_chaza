// CANVAS ESTRELAS
(function () {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    let stars = [], W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < 160; i++) {
            stars.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.3 + 0.3,
                speed: Math.random() * 0.004 + 0.001,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    let prev = 0;
    function loop(ts) {
        requestAnimationFrame(loop);
        if (ts - prev < 30) return;
        prev = ts;
        ctx.clearRect(0, 0, W, H);
        const t = ts * 0.001;
        for (const s of stars) {
            const a = 0.2 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(210,190,255,${a})`;
            ctx.fill();
        }
    }

    resize();
    createStars();
    requestAnimationFrame(loop);
    window.addEventListener('resize', () => { resize(); createStars(); });
})();


// REVEAL ON SCROLL
(function () {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), (i % 4) * 80);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
})();


// FAQ
function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const ans = item.querySelector('.faq-a');
    const open = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-a').style.maxHeight = null;
    });

    if (!open) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
    }
}


// PULSO CTA
(function () {
    setInterval(() => {
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.style.boxShadow = '0 0 70px rgba(168,85,247,0.9)';
            setTimeout(() => btn.style.boxShadow = '0 0 40px rgba(124,58,237,0.5)', 600);
        });
    }, 3000);
})();
const ceremonyDate = new Date("2026-11-19T00:00:00+05:30");
const countdown = document.querySelector("#countdown");
document.documentElement.classList.add("motion-ready");

function updateCountdown() {
    const remaining = ceremonyDate.getTime() - Date.now();
    const values = {
        days: Math.max(0, Math.floor(remaining / 86400000)),
        hours: Math.max(0, Math.floor((remaining / 3600000) % 24)),
        minutes: Math.max(0, Math.floor((remaining / 60000) % 60)),
        seconds: Math.max(0, Math.floor((remaining / 1000) % 60))
    };

    Object.entries(values).forEach(([unit, value]) => {
        const element = countdown.querySelector(`[data-unit="${unit}"]`);
        element.textContent = String(value).padStart(2, "0");
    });
}

updateCountdown();
setInterval(updateCountdown, 1000);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.16 });

    document.querySelectorAll(".section, .countdown-band").forEach((section) => {
        revealObserver.observe(section);
    });
} else {
    document.querySelectorAll(".section, .countdown-band").forEach((section) => {
        section.classList.add("is-visible");
    });
}

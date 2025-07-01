// --- ANIMATIONS AU SCROLL AVEC SCROLLREVEAL ---
const sr = ScrollReveal({
    distance: '60px',
    duration: 1800,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: false,
    viewFactor: 0.2,
    mobile: true
});

// Applique l'effet de "révélation" à tous les éléments avec la classe .reveal
sr.reveal('.reveal', {
    origin: 'bottom',
    interval: 100
});


// --- LOGIQUE DE LA NAVBAR ---
const nav = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

// Effet de scroll sur la navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Logique d'ouverture/fermeture du menu burger
burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');

    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    burger.classList.toggle('toggle');
});
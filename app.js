// --- ANIMATIONS AU SCROLL AVEC SCROLLREVEAL ---
const sr = ScrollReveal({
    distance: '60px',
    duration: 1800,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: false,
    viewFactor: 0.2,
    mobile: true
});

sr.reveal('.reveal', {
    origin: 'bottom',
    interval: 100
});


// --- LOGIQUE DE LA NAVBAR ---
const nav = document.querySelector('.navbar');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

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


// --- LOGIQUE DE LA CARTE INTERACTIVE ---
const mapElement = document.getElementById('map');

if (mapElement) {
    // 1. Initialisation de la carte
    const map = L.map('map').setView([47.5, 2.5], 5.8);

    // 2. Ajout du fond de carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 3. Définition des données (AVEC LES ZONES DE CHAMPS)
    const destination = {
        name: 'Notre atelier en Alsace',
        coords: [48.5839, 7.7445] // Strasbourg (notre point de transformation)
    };

    const routes = {
        orge: {
            // CORRECTION: Point dans une zone agricole de Lorraine
            origin: { name: 'Champs de Lorraine', coords: [48.83, 6.05] },
            color: '#253679' // Bleu
        },
        lentilles: {
            // CORRECTION: Point dans une zone agricole des Hauts-de-France
            origin: { name: 'Champs des Hauts-de-France', coords: [49.86, 2.55] },
            color: '#EA5153' // Rouge
        },
        ble: {
            // CORRECTION: Point dans une autre zone agricole des Hauts-de-France
            origin: { name: 'Champs des Hauts-de-France', coords: [50.15, 3.20] },
            color: '#93C34B' // Vert
        }
    };
    
    let currentRouteLayer = L.layerGroup().addTo(map);
    
    // 4. Fonction pour dessiner une route
    const drawRoute = (productKey) => {
        currentRouteLayer.clearLayers();
        const routeData = routes[productKey];
        if (!routeData) return;

        const originMarker = L.marker(routeData.origin.coords).bindPopup(`<b>Zone de culture :</b><br>${routeData.origin.name}`);
        const destMarker = L.marker(destination.coords).bindPopup(`<b>Notre atelier :</b><br>${destination.name}`);
        
        const routeLine = L.polyline([routeData.origin.coords, destination.coords], {
            color: routeData.color,
            weight: 4,
            opacity: 0.8
        });

        currentRouteLayer.addLayer(originMarker);
        currentRouteLayer.addLayer(destMarker);
        currentRouteLayer.addLayer(routeLine);
        
        map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
    };

    // 5. Gestion des clics sur les boutons
    const mapButtons = document.querySelectorAll('.map-btn');
    
    mapButtons.forEach(button => {
        button.addEventListener('click', () => {
            mapButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const productKey = button.dataset.product;
            drawRoute(productKey);
        });
    });

    // 6. Afficher la première route par défaut
    document.querySelector('.map-btn[data-product="orge"]').click();
}

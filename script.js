const propiedades = [
    { id: 1, nombre: "Mad Wayne Thunder Drive 21", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 2, nombre: "Steele Way 7", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 3, nombre: "Mad Wayne Thunder Drive 22", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 4, nombre: "Ace Jones Drive 13", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 5, nombre: "Ace Jones Drive 14", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 6, nombre: "North Sheldon Avenue 35", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 7, nombre: "Hillcrest Avenue 24", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 8, nombre: "Hillcrest Avenue 25", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 9, nombre: "Milton Road 41", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 10, nombre: "Picture Perfect Drive 39", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 11, nombre: "Picture Perfect Drive 38", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 12, nombre: "Picture Perfect Drive 37", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 13, nombre: "South Mo Milton Drive 6932", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 14, nombre: "Didion Drive 47", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 15, nombre: "Cox Way 9", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 16, nombre: "Didion Drive 46", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 17, nombre: "Whispymound Drive 11", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 18, nombre: "Whispymound Drive 12", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 19, nombre: "West Eclipse Boulevard 30", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
    { id: 20, nombre: "West Eclipse Boulevard 39", precio: " En efectivo o via Coins.", estado: "DISPONIBLE" },
];

document.addEventListener('DOMContentLoaded', () => {
    cargarPropiedades();
    initScrollLogic();
    initScrollReveal();
});

function cargarPropiedades() {
    const grid = document.getElementById('property-grid');
    if (!grid) return;
    const fragment = document.createDocumentFragment();

    propiedades.forEach(p => {
        const tagClass = p.estado.toUpperCase().includes("VENDIDA") ? "tag-vendida" : "tag-disponible";
        const card = document.createElement('div');
        card.className = 'card';

        // ✅ FIX #3: width y height explícitos en la imagen para evitar CLS.
        // El navegador reserva el espacio ANTES de que cargue la imagen,
        // eliminando el salto de layout (Cumulative Layout Shift).
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="img/casas/casa${p.id}.webp"
                         loading="lazy"
                         decoding="async"
                         width="400"
                         height="200"
                         alt="${p.nombre}">
                    <div style="padding:20px;">
                        <h3 style="font-size: 1.05rem; margin-bottom:8px;">${p.nombre}</h3>
                        <p style="color:#d4af37; font-weight:bold; font-size:1.1rem; margin-bottom:15px;">${p.precio}</p>
                        <span class="tag-common ${tagClass}">${p.estado}</span>
                    </div>
                    <span class="click-info">Da click para mas información</span>
                </div>
                <div class="card-back">
                    <h3 style="font-size: 10px; color: #d4af37; letter-spacing: 2px; margin-bottom: 12px;">UBICACIÓN GPS</h3>
                    <div class="gps-preview-box" data-gps-id="${p.id}">
                        <div style="color: #444; font-size: 9px; margin-top: 70px; text-align:center;">CARGANDO MAPA...</div>
                    </div>
                    <button class="btn-buy-centered" data-action="buy" style="margin-top:15px;">¡LA QUIERO!</button>
                </div>
            </div>`;

        card.addEventListener('click', (e) => {
            const gpsBox = e.target.closest('.gps-preview-box');
            const buyBtn = e.target.closest('[data-action="buy"]');

            if (gpsBox) {
                e.stopPropagation();
                const gpsId = gpsBox.getAttribute('data-gps-id');
                openFullMap(`img/gps/gps${gpsId}.webp`);
            }
            else if (buyBtn) {
                e.stopPropagation();
                buyHouse();
            }
            else {
                // Carga bajo demanda al dar click para voltear
                if (!card.classList.contains('is-flipped')) {
                    const gpsContainer = card.querySelector('.gps-preview-box');
                    if (!gpsContainer.querySelector('img')) {
                        const gpsId = gpsContainer.getAttribute('data-gps-id');
                        // loading="eager" porque el usuario ya lo pidió explícitamente al dar click
                        gpsContainer.innerHTML = `<img src="img/gps/gps${gpsId}.webp" loading="eager" decoding="async" alt="GPS ${p.nombre}">`;
                    }
                }
                card.classList.toggle('is-flipped');
            }
        });

        fragment.appendChild(card);
    });
    grid.appendChild(fragment);
}

function initScrollLogic() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop && st > 150) navbar.classList.add('header-hidden');
        else navbar.classList.remove('header-hidden');
        lastScrollTop = st;
    }, { passive: true });
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ✅ FIX #5: will-change se activa justo ANTES de animar,
                // no de forma permanente en todos los elementos desde el inicio.
                // Esto evita consumo innecesario de VRAM cuando los elementos
                // aún no están siendo animados.
                entry.target.style.willChange = 'transform, opacity';

                entry.target.classList.add('active');

                // ✅ FIX #5: Se limpia will-change después de la transición
                // para liberar el recurso de composición una vez terminada la animación.
                entry.target.addEventListener('transitionend', () => {
                    entry.target.style.willChange = 'auto';
                }, { once: true });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function buyHouse() { document.getElementById("notificationModal").style.display = "flex"; }
function closeNotification() { document.getElementById("notificationModal").style.display = "none"; }

function openFullMap(src) {
    const modal = document.getElementById("imageModal");
    const img = document.getElementById("img01");
    if (modal && img) { img.src = src; modal.style.display = "flex"; }
}

// ✅ FIX #6: addEventListener en lugar de window.onclick =
// La asignación directa (window.onclick = fn) sobreescribe cualquier otro
// listener de click global que exista o se añada en el futuro.
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) e.target.style.display = "none";
});

const propiedades = [
    { id: 1, nombre: "Sunset Apartments", precio: "50,000", estado: "DISPONIBLE AHORA" },
    { id: 2, nombre: "Mirror Park Home", precio: "85,000", estado: "DISPONIBLE AHORA" },
    { id: 3, nombre: "Vinewood Mansion", precio: "150,000", estado: "DISPONIBLE AHORA" },
    { id: 4, nombre: "Vinewood Mansion", precio: "150,000", estado: "DISPONIBLE AHORA" },
    { id: 5, nombre: "Vinewood Mansion", precio: "150,000", estado: "DISPONIBLE AHORA" },
    { id: 6, nombre: "Vinewood Mansion", precio: "150,000", estado: "DISPONIBLE AHORA" },
    { id: 7, nombre: "Vinewood Mansion", precio: "150,000", estado: "DISPONIBLE AHORA" },
    { id: 8, nombre: "Vinewood Mansion", precio: "150,000", estado: "DISPONIBLE AHORA" },
    { id: 9, nombre: "Vinewood Mansion", precio: "150,000", estado: "VENDIDO" },
    { id: 10, nombre: "Vinewood Mansion", precio: "150,000", estado: "VENDIDO" },
    { id: 25, nombre: "Propiedad Ejemplo", precio: "120,000", estado: "VENDIDO" }
    // Añade aquí las demás propiedades siguiendo el mismo formato
];

function cargarPropiedades() {
    const grid = document.getElementById('property-grid');
    if (!grid) return;

    propiedades.forEach(p => {
        const isSold = p.estado === "VENDIDO" ? "sold" : "";
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = function() { this.classList.toggle('is-flipped'); };

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="image-placeholder">
                        <img src="img/casas/casa${p.id}.png" alt="${p.nombre}" loading="lazy">
                    </div>
                    <div class="info">
                        <h3>${p.nombre}</h3>
                        <p class="price">$${p.precio}</p>
                        <span class="tag ${isSold}">${p.estado}</span>
                        <p class="details">Da click para más información</p>
                    </div>
                </div>
                <div class="card-back">
                    <h3 class="back-title">📍 UBICACIÓN GPS</h3>
                    <div class="gps-preview">
                        <img src="img/gps/gps${p.id}.png" alt="Mapa" onclick="openFullMap(this.src); event.stopPropagation();">
                    </div>
                    <button class="btn-buy-centered" onclick="buyHouse(); event.stopPropagation();">¡LA QUIERO!</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Inicialización y funciones de control
window.onload = cargarPropiedades;

function openFullMap(src) {
    const modal = document.getElementById("gps-modal");
    document.getElementById("full-map-img").src = src;
    modal.style.display = "flex";
}

function closeFullMap() {
    document.getElementById("gps-modal").style.display = "none";
}

function buyHouse() {
    document.getElementById("notification-modal").style.display = "flex";
}

function closeNotification() {
    document.getElementById("notification-modal").style.display = "none";
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") { closeFullMap(); closeNotification(); }
});

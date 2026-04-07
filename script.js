const propiedades = [
    { id: 1, nombre: "Mad Wayne Thunder Drive 21", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 2, nombre: "Steele Way 7", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 3, nombre: "Mad Wayne Thunder Drive 22", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 4, nombre: "Ace Jones Drive 13", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 5, nombre: "Ace Jones Drive 14", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 6, nombre: "North Sheldon Avenue 35", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 7, nombre: "Hillcrest Avenue 24", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 8, nombre: "Hillcrest Avenue 25", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 9, nombre: "Milton Road 41", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 10, nombre: "Picture Perfect Drive 39", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 11, nombre: "Picture Perfect Drive 38", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 12, nombre: "Picture Perfect Drive 37", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 13, nombre: "South Mo Milton Drive 6932", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 14, nombre: "Didion Drive 47", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 15, nombre: "Cox Way 9", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 16, nombre: "Didion Drive 46", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 17, nombre: "Whispymound Drive 11", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 18, nombre: "Whispymound Drive 12", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 19, nombre: "West Eclipse Boulevard 30", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
    { id: 20, nombre: "West Eclipse Boulevard 39", precio: " En efectivo o via Coins.", estado: "DISPONIBLE AHORA" },
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

// Usar DOMContentLoaded es mejor porque no espera a las imágenes, 
// solo a que la estructura esté lista para dibujar las tarjetas.
document.addEventListener('DOMContentLoaded', cargarPropiedades);

function openFullMap(src) {
    const modal = document.getElementById("gps-modal");
    const modalImg = document.getElementById("full-map-img");
    if (modal && modalImg) {
        modalImg.src = src;
        modal.style.display = "flex";
    }
}

function closeFullMap() {
    const modal = document.getElementById("gps-modal");
    if (modal) modal.style.display = "none";
}

function buyHouse() {
    const modal = document.getElementById("notification-modal");
    if (modal) modal.style.display = "flex";
}

function closeNotification() {
    const modal = document.getElementById("notification-modal");
    if (modal) modal.style.display = "none";
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") { 
        closeFullMap(); 
        closeNotification(); 
    }
});
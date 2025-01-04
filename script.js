// Variables
const form = document.getElementById("reservation-form");
const statusPublico = document.getElementById("status-publico");
const reservationStatus = document.getElementById("reservation-status");
const notification = document.getElementById("notification");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const menu = document.getElementById("menu");
const availableCount = document.getElementById("available-count-number");
let reservations = [];

// Datos de consola (simulado)
let consoles = {
    "Xbox": 4,
    "PlayStation": 4,
    "PC": 4
};

// Función para actualizar el contador de consolas disponibles
function updateAvailableCount() {
    let totalAvailable = 0;
    for (let consoleType in consoles) {
        if (consoles[consoleType] > 0) {
            totalAvailable++;
        }
    }
    availableCount.textContent = totalAvailable;
}

// Función para manejar la reserva
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let console = document.getElementById("console").value;
    let reservationTime = document.getElementById("reservation-time").value;

    // Verificar disponibilidad
    if (consoles[console] > 0) {
        consoles[console]--;
        reservations.push({ username, console, reservationTime });
        updateAvailableCount();
        reservationStatus.innerHTML = `Reserva exitosa para ${username} en ${console} a las ${reservationTime}`;
        showNotification(`Reserva realizada exitosamente para ${username}`);
    } else {
        reservationStatus.innerHTML = `No hay consolas disponibles de ${console}.`;
    }
});

// Función para mostrar notificaciones
function showNotification(message) {
    notification.innerHTML = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

// Función para abrir/cerrar el menú
menuBtn.addEventListener("click", function () {
    menu.style.display = "block";
});

closeBtn.addEventListener("click", function () {
    menu.style.display = "none";
});

// Función para limpiar reservas
document.getElementById("clear-reservations").addEventListener("click", function () {
    reservations = [];
    reservationStatus.innerHTML = "Todas las reservas han sido eliminadas.";
});

// Actualizar el contador inicial
updateAvailableCount();

// Variables
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('close-btn');
const reservationForm = document.getElementById('reservation-form');
const reservationStatus = document.getElementById('reservation-status');
const passwordForm = document.getElementById('password-form');
const consoleStatus = document.getElementById('console-status');
const statusList = document.getElementById('status-list');
const password = 'admin123';  // Contraseña para el acceso privado
const notification = document.getElementById('notification');

// Mostrar/Ocultar menú
menuBtn.addEventListener('click', () => {
    menu.style.display = 'block';
});
closeBtn.addEventListener('click', () => {
    menu.style.display = 'none';
});

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Función para actualizar el estado de las consolas
function updateStatus() {
    const consoles = ['Xbox1', 'Xbox2', 'Xbox3', 'Xbox4', 'PlayStation1', 'PlayStation2', 'PlayStation3', 'PlayStation4', 'PC1', 'PC2'];
    statusList.innerHTML = ''; // Limpiar lista
    consoles.forEach(console => {
        const state = localStorage.getItem(console) || 'Desocupada';
        const div = document.createElement('div');
        div.innerHTML = `${console}: <span class="${state.toLowerCase()}">${state}</span>`;
        statusList.appendChild(div);
    });
}

// Función para manejar reservas
reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const console = document.getElementById('console').value;
    const reservationTime = document.getElementById('reservation-time').value;

    if (!username || !reservationTime) {

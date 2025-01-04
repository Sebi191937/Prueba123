// Mostrar/Ocultar Menú
function toggleMenu() {
    document.getElementById('menu').classList.toggle('hidden');
}

// Cambiar Sección Visible
function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => section.classList.add('hidden'));

    const section = document.getElementById(sectionId);
    if (section) section.classList.remove('hidden');

    document.getElementById('menu').classList.add('hidden');
}

// Sistema de Reservas
document.getElementById('form-reserva').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const consola = document.getElementById('consola').value;
    const hora = document.getElementById('hora').value;
    
    if (nombre && consola && hora) {
        const reserva = { nombre, consola, hora };
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        alert('Reserva realizada');
        showReservations();
    }
});

// Mostrar Reservas
function showReservations() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const list = document.getElementById('status-privado');
    list.innerHTML = ''; // Limpiar antes de mostrar
    reservas.forEach(reserva => {
        const item = document.createElement('div');
        item.innerHTML = `${reserva.nombre} reservó ${reserva.consola} para el ${new Date(reserva.hora).toLocaleString()}`;
        list.appendChild(item);
    });
}

// Verificación de Contraseña y acceso a Status Privado
function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === '12345') {
        document.get

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
        document.getElementById('panel-status').classList.remove('hidden');
        showConsolesStatus();
    } else {
        alert('Contraseña incorrecta');
    }
}

// Cambiar Estado de Consolas
function showConsolesStatus() {
    const consolas = ['Xbox 1', 'Xbox 2', 'Xbox 3', 'Xbox 4', 'PlayStation 1', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PC 1', 'PC 2'];
    const container = document.getElementById('consolas-status');
    container.innerHTML = '';
    consolas.forEach(consola => {
        const div = document.createElement('div');
        div.innerHTML = `
            <label for="${consola}">${consola}</label>
            <select id="${consola}" onchange="updateConsoleStatus('${consola}')">
                <option value="Desocupada">Desocupada</option>
                <option value="Ocupada">Ocupada</option>
            </select>
        `;
        container.appendChild(div);
    });
}

// Actualizar Estado de Consolas
function updateConsoleStatus(consola) {
    const status = document.getElementById(consola).value;
    localStorage.setItem(consola, status);
    updatePublicStatus();
}

// Actualizar Estado Público
function updatePublicStatus() {
    const consolas = ['Xbox 1', 'Xbox 2', 'Xbox 3', 'Xbox 4', 'PlayStation 1', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PC 1', 'PC 2'];
    const container = document.getElementById('status-consolas');
    container.innerHTML = '';
    consolas.forEach(consola => {
        const status = localStorage.getItem(consola) || 'Desocupada';
        const div = document.createElement('div');
        div.innerHTML = `${consola}: <span class="${status === 'Desocupada' ? 'green' : 'red'}">${status}</span>`;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    showReservations();
    updatePublicStatus();
});

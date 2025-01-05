// Menú desplegable
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('hidden');
}

// Mostrar secciones
function showSection(id) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === id) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}

// Sistema de Reservas
const formReserva = document.getElementById('form-reserva');
const mensajeReserva = document.getElementById('mensaje-reserva');
formReserva.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const consola = document.getElementById('consola').value;
    const hora = document.getElementById('hora').value;
    
    if (nombre && consola && hora) {
        const reserva = { nombre, consola, hora, fecha: new Date() };
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        mensajeReserva.innerText = "Reserva realizada";
        actualizarReservas();
    }
});

// Actualizar lista de reservas
function actualizarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const listaReservas = document.getElementById('reservas-lista');
    listaReservas.innerHTML = '';
    
    reservas.forEach((reserva, index) => {
        const reservaItem = document.createElement('div');
        reservaItem.innerHTML = `<p>${reserva.nombre} - ${reserva.consola} - ${reserva.hora} <button onclick="eliminarReserva(${index})">Eliminar</button></p>`;
        listaReservas.appendChild(reservaItem);
    });
}

// Eliminar una reserva
function eliminarReserva(index) {
    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.splice(index, 1);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    actualizarReservas();
}

// Acceso a Status Privado
function verificarContraseña() {
    const password = document.getElementById('password').value;
    const contrasenaCorrecta = "admin123"; // Cambia esto por la contraseña real
    if (password === contrasenaCorrecta) {
        document.getElementById('estado-consolas').innerHTML = obtenerEstadoConsolasHTML();
        document.getElementById('reservas-lista').classList.remove('hidden');
    } else {
        alert("Contraseña incorrecta");
    }
}

// Generar HTML para estado de consolas
function obtenerEstadoConsolasHTML() {
    const consolas = ['Xbox 1', 'Xbox 2', 'Xbox 3', 'Xbox 4', 'PlayStation 1', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PC 1', 'PC 2'];
    let html = '';
    consolas.forEach((consola) => {
        html += `
            <div class="estado-consola">
                <label>${consola}</label>
                <select onchange="actualizarEstadoConsola('${consola}', this)">
                    <option value="desocupada">Desocupada</option>
                    <option value="ocupada">Ocupada</option>
                </select>
            </div>
        `;
    });
    return html;
}

// Actualizar estado de consola
function actualizarEstadoConsola(consola, selector) {
    const estado = selector.value;
    let estados = JSON.parse(localStorage.getItem('estados-consolas')) || {};
    estados[consola] = estado;
    localStorage.setItem('estados-consolas', JSON.stringify(estados));
    actualizarEstadoPublico();
}

// Actualizar estado público
function actualizarEstadoPublico() {
    const estados = JSON.parse(localStorage.getItem('estados-consolas')) || {};
    const consolasPublico = document.getElementById('consolas-publico');
    consolasPublico.innerHTML = '';
    const consolas = ['Xbox 1', 'Xbox 2', 'Xbox 3', 'Xbox 4', 'PlayStation 1', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PC 1', 'PC 2'];
    
    consolas.forEach(consola => {
        const estado = estados[consola] || 'desocupada';
        consolasPublico.innerHTML += `
            <p class="${estado}">${consola} - ${estado.charAt(0).toUpperCase() + estado.slice(1)}</p>
        `;
    });
}

// Iniciar la actualización del estado público al cargar la página
document.addEventListener('DOMContentLoaded', actualizarEstadoPublico);

</script>

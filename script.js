// script.js
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('main section');

    const registroForm = document.getElementById('registro-form');
    const registroMensaje = document.getElementById('registro-mensaje');

    const loginForm = document.getElementById('login-form');
    const loginMensaje = document.getElementById('login-mensaje');

    const reservaForm = document.getElementById('reserva-form');
    const mensajeReserva = document.getElementById('mensaje-reserva');

    const privadoLoginForm = document.getElementById('privado-login-form');
    const privadoLoginMensaje = document.getElementById('privado-login-mensaje');
    const panelPrivado = document.getElementById('panel-privado');

    const listaPublica = document.getElementById('lista-publica');
    const listaPrivada = document.getElementById('lista-privada');
    const listaReservas = document.getElementById('lista-reservas');

    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');


    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    menuClose.addEventListener('click', () => {
        menu.classList.add('hidden');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            menu.classList.add('hidden');
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            const target = document.querySelector(item.getAttribute('href'));
            target.classList.remove('hidden');
        });
    });

    registroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('reg-nombre').value;
        const correo = document.getElementById('reg-correo').value;
        const password = document.getElementById('reg-password').value;

        const usuario = { nombre, correo, password };
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        registroMensaje.textContent = "Registro exitoso";
        registroMensaje.classList.remove('hidden');
        setTimeout(() => registroMensaje.classList.add('hidden'), 3000);
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const correo = document.getElementById('login-correo').value;
        const password = document.getElementById('login-password').value;

        const usuario = usuarios.find(u => u.correo === correo && u.password === password);
        if (usuario) {
            currentUser = usuario;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            loginMensaje.textContent = "Login exitoso";
            loginMensaje.classList.remove('hidden');
            setTimeout(() => loginMensaje.classList.add('hidden'), 3000);
        } else {
            loginMensaje.textContent = "Correo o contraseña incorrecta";
            loginMensaje.classList.remove('hidden');
        }
    });

    reservaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const consola = document.getElementById('consola').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;

        if (nombre && consola && fecha && hora) {
            const reserva = { nombre, consola, fecha, hora, fechaCreacion: new Date().toISOString() };
            guardarReserva(reserva);
            mensajeReserva.textContent = "Reserva enviada";
            mensajeReserva.classList.remove('hidden');
            setTimeout(() => mensajeReserva.classList.add('hidden'), 3000);
        }
    });

    privadoLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('privado-password').value;
        if (password === 'tu_contraseña') {
            privadoLoginMensaje.classList.add('hidden');
            panelPrivado.classList.remove('hidden');
            cargarReservas();
            cargarEstados();
        } else {
            privadoLoginMensaje.textContent = "Contraseña incorrecta";
            privadoLoginMensaje.classList.remove('hidden');
        }
    });

    function guardarReserva(reserva) {
        let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
    }

    function cargarReservas() {
        let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
        listaReservas.innerHTML = '';
        reservas.forEach(reserva => {
            const li = document.createElement('li');
            li.textContent = `${reserva.nombre} - ${reserva.consola} - ${reserva.fecha} ${reserva.hora}`;
            listaReservas.appendChild(li);
        });
    }

    function cargarEstados() {
        const consolas = ['Xbox', 'PlayStation', 'PC'];
        const estados = JSON.parse(localStorage.getItem('estados') || '[]');
        listaPrivada.innerHTML = '';
        consolas.forEach(consola => {
            const estado = estados.find(e => e.consola === consola) || { consola, estado: 'Desocupada' };
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${consola}: </span>
                <select class="estado-selector" data-consola="${consola}">
                    <option value="Desocupada" ${estado.estado === 'Desocupada' ? 'selected' : ''}>Desocupada</option>
                    <option value="Ocupada" ${estado.estado === 'Ocupada' ? 'selected' : ''}>Ocupada</option>
                </select>
            `;
            listaPrivada.appendChild(li);
        });
    }

    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('estado-selector')) {
            const consola = e.target.dataset.consola;
            const estado = e.target.value;
            let estados = JSON.parse(localStorage.getItem('estados') || '[]');
            const index = estados.findIndex(e => e.consola === consola);
            if (index > -1) {
                estados[index].estado = estado;
            } else {
                estados.push({ consola, estado });
            }
            localStorage.setItem('estados', JSON.stringify(estados));
            actualizarStatusPublico();
        }
    });

    function actualizarStatusPublico() {
        const estados = JSON.parse(localStorage.getItem('estados') || '[]');
        listaPublica.innerHTML = '';
        estados.forEach(estado => {
            const li = document.createElement('li');
            li.textContent = `${estado.consola}: ${estado.estado}`;
            li.className = `estado ${estado.estado === 'Ocupada' ? 'ocupada' : ''}`;
            listaPublica.appendChild(li);
        });
    }

    // Inicializar
    actualizarStatusPublico();
});

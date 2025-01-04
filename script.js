document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-icon');
    const menuClose = document.getElementById('close-icon');
    const menu = document.getElementById('menu');
    const tabs = document.querySelectorAll('.tab');

    const registroForm = document.getElementById('registro-form');
    const registroMensaje = document.getElementById('registro-mensaje');

    const loginForm = document.getElementById('login-form');
    const loginMensaje = document.getElementById('login-mensaje');

    const reservaForm = document.getElementById('reservation-form');
    const mensajeReserva = document.getElementById('reservation-confirmation');

    const listaPublica = document.getElementById('public-status');
    const listaPrivada = document.getElementById('private-consoles');

    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    const closeMenu = () => menu.classList.add('hidden');
    const openMenu = () => menu.classList.remove('hidden');

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);

    // Cambiar de pestaña
    const showTab = (tabId) => {
        tabs.forEach(tab => tab.classList.add('hidden'));
        document.getElementById(tabId).classList.remove('hidden');
        closeMenu();
    };

    // Registro de usuarios
    registroForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('reg-nombre').value;
        const correo = document.getElementById('reg-correo').value;
        const password = document.getElementById('reg-password').value;

        if (usuarios.some(u => u.correo === correo)) {
            registroMensaje.textContent = 'El usuario ya existe.';
            return;
        }

        const nuevoUsuario = { nombre, correo, password };
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        registroMensaje.textContent = 'Registro exitoso.';
        registroMensaje.classList.remove('hidden');
        setTimeout(() => registroMensaje.classList.add('hidden'), 3000);
    });

    // Inicio de sesión
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const correo = document.getElementById('login-correo').value;
        const password = document.getElementById('login-password').value;

        const usuario = usuarios.find(u => u.correo === correo && u.password === password);
        if (usuario) {
            currentUser = usuario;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            loginMensaje.textContent = 'Login exitoso.';
        } else {
            loginMensaje.textContent = 'Correo o contraseña incorrectos.';
        }
        loginMensaje.classList.remove('hidden');
        setTimeout(() => loginMensaje.classList.add('hidden'), 3000);
    });

    // Gestión de consolas
    const generarListaConsolas = () => {
        const consolas = [
            { tipo: 'Xbox', cantidad: 4 },
            { tipo: 'PlayStation', cantidad: 4 },
            { tipo: 'PC', cantidad: 2 }
        ];

        const crearLista = (lista, contenedor) => {
            contenedor.innerHTML = '';
            lista.forEach(({ tipo, cantidad }) => {
                for (let i = 0; i < cantidad; i++) {
                    const li = document.createElement('li');
                    li.textContent = `${tipo} - ${i + 1}`;
                    contenedor.appendChild(li);
                }
            });
        };

        crearLista(consolas, listaPublica);
        crearLista(consolas, listaPrivada);
    };

    // Inicializar
    generarListaConsolas();
});

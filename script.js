document.addEventListener('DOMContentLoaded', function() {
    // Validación de Campos en Tiempo Real
    const formRegistro = document.getElementById('form-registro');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    formRegistro.addEventListener('submit', function(event) {
        event.preventDefault();
        validarFormulario();
    });

    function validarFormulario() {
        let valid = true;

        // Validar nombre
        if (nombreInput.value.trim() === '') {
            mostrarError(nombreInput, 'El nombre es obligatorio');
            valid = false;
        } else {
            eliminarError(nombreInput);
        }

        // Validar email
        if (emailInput.value.trim() === '') {
            mostrarError(emailInput, 'El correo electrónico es obligatorio');
            valid = false;
        } else if (!validarEmail(emailInput.value)) {
            mostrarError(emailInput, 'El correo electrónico no es válido');
            valid = false;
        } else {
            eliminarError(emailInput);
        }

        // Validar contraseña
        if (passwordInput.value.trim() === '') {
            mostrarError(passwordInput, 'La contraseña es obligatoria');
            valid = false;
        } else {
            eliminarError(passwordInput);
        }

        // Validar confirmación de contraseña
        if (confirmPasswordInput.value.trim() === '') {
            mostrarError(confirmPasswordInput, 'Debe confirmar la contraseña');
            valid = false;
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            mostrarError(confirmPasswordInput, 'Las contraseñas no coinciden');
            valid = false;
        } else {
            eliminarError(confirmPasswordInput);
        }

        if (valid) {
            alert('Formulario enviado correctamente');
            formRegistro.reset();
        }
    }

    function mostrarError(input, message) {
        const parent = input.parentElement;
        const error = parent.querySelector('.error-message');
        if (error) {
            error.textContent = message;
        } else {
            const errorMessage = document.createElement('span');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            parent.appendChild(errorMessage);
        }
        input.classList.add('error');
    }

    function eliminarError(input) {
        const parent = input.parentElement;
        const error = parent.querySelector('.error-message');
        if (error) {
            parent.removeChild(error);
        }
        input.classList.remove('error');
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Notificación de Estado de Consola
    function mostrarNotificacion(mensaje) {
        const notificacion = document.getElementById('notificacion-estado');
        const mensajeNotificacion = document.getElementById('mensaje-notificacion');
        mensajeNotificacion.textContent = mensaje;
        notificacion.classList.remove('hidden');
        setTimeout(() => {
            notificacion.classList.add('hidden');
        }, 3000);
    }

    // Barra de Progreso de Reserva
    const barraProgreso = document.getElementById('barra-progreso');
    const progreso = document.getElementById('progreso');

    function actualizarProgreso(porcentaje) {
        progreso.style.width = `${porcentaje}%`;
    }

    // Sistema de Confirmación de Reserva
    const btnConfirmarReserva = document.getElementById('btn-confirmar-reserva');
    if (btnConfirmarReserva) {
        btnConfirmarReserva.addEventListener('click', function() {
            const confirmacion = confirm('¿Está seguro de que desea confirmar la reserva?');
            if (confirmacion) {
                alert('Reserva confirmada');
                // Aquí puedes añadir más lógica para la confirmación de la reserva
            }
        });
    }

    // Sincronización en Tiempo Real de Estado de Consolas
    const estadoConsolas = document.getElementById('estado-consolas');
    if (estadoConsolas) {
        setInterval(() => {
            // Aquí deberías hacer una solicitud a tu servidor para obtener el estado actualizado de las consolas
            // Por ejemplo, usando fetch()
            fetch('/api/estado-consolas')
                .then(response => response.json())
                .then(data => {
                    // Actualiza la interfaz de usuario con el estado actualizado de las consolas
                    // Por ejemplo:
                    data.forEach(consola => {
                        const consolaElemento = document.getElementById(`consola-${consola.id}`);
                        if (consolaElemento) {
                            consolaElemento.textContent = consola.estado;
                        }
                    });
                });
        }, 5000); // Actualiza cada 5 segundos
    }

    // Mostrar Horas Disponibles
    const calendario = document.getElementById('calendario');
    if (calendario) {
        calendario.addEventListener('click', function(event) {
            const diaSeleccionado = event.target;
            if (diaSeleccionado.classList.contains('dia')) {
                // Aquí deberías hacer una solicitud a tu servidor para obtener las horas disponibles para el día seleccionado
                // Por ejemplo, usando fetch()
                fetch(`/api/horas-disponibles?dia=${diaSeleccionado.dataset.dia}`)
                    .then(response => response.json())
                    .then(data => {
                        // Actualiza la interfaz de usuario con las horas disponibles
                        // Por ejemplo:
                        const horasDisponibles = document.getElementById('horas-disponibles');
                        horasDisponibles.innerHTML = '';
                        data.forEach(hora => {
                            const horaElemento = document.createElement('div');
                            horaElemento.textContent = hora;
                            horasDisponibles.appendChild(horaElemento);
                        });
                    });
            }
        });
    }

    // Campo de Notas de la Reserva
    const campoNotas = document.getElementById('campo-notas');
    if (campoNotas) {
        campoNotas.addEventListener('input', function() {
            // Puedes añadir lógica para manejar las notas de la reserva aquí
            console.log('Notas:', campoNotas.value);
        });
    }

    // Confirmación de Email para Reservas
    function enviarConfirmacionEmail(email, detallesReserva) {
        // Aquí deberías hacer una solicitud a tu servidor para enviar el correo electrónico de confirmación
        // Por ejemplo, usando fetch()
        fetch('/api/enviar-confirmacion-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                detalles: detallesReserva
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Correo de confirmación enviado');
            } else {
                alert('Error al enviar el correo de confirmación');
            }
        });
    }

    // Mostrar la Hora Exacta de la Reserva
    function mostrarHoraExacta(reserva) {
        const fecha = new Date(reserva.fecha);
        const horaExacta = fecha.toLocaleString();
        const horaElemento = document.createElement('p');
        horaElemento.textContent = `Hora de la reserva: ${horaExacta}`;
        document.getElementById('detalles-reserva').appendChild(horaElemento);
    }

    // Eliminar Reservas Expiradas
    function eliminarReservasExpiradas() {
        const ahora = new Date();
        document.querySelectorAll('.reserva').forEach(reserva => {
            const fechaReserva = new Date(reserva.dataset.fecha);
            if (ahora - fechaReserva > 7 * 24 * 60 * 60 * 1000) { // 7 días en milisegundos
                reserva.remove();
            }
        });
    }
    setInterval(eliminarReservasExpiradas, 24 * 60 * 60 * 1000); // Comprobar una vez al día

    // Función de "Pedir Ayuda"
    const btnPedirAyuda = document.getElementById('btn-pedir-ayuda');
    if (btnPedirAyuda) {
        btnPedirAyuda.addEventListener('click', function() {
            alert('Un administrador será notificado para ayudarle.');
            // Aquí puedes añadir lógica para notificar a un administrador
        });
    }

    // Autenticación por Token
    function autenticarUsuario(token) {
        fetch('/api/autenticar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Usuario autenticado');
            } else {
                console.log('Error en la autenticación');
            }
        });
    }

    // Generación de Recibos
    function generarRecibo(reserva) {
        const recibo = `
            Reserva Confirmada
            ---------------------
            Usuario: ${reserva.usuario}
            Consola: ${reserva.consola}
            Fecha: ${new Date(reserva.fecha).toLocaleString()}
            ---------------------
            ¡Gracias por su reserva!
        `;
        console.log(recibo);
    }

    // Control de Errores en Formularios
    function controlDeErrores(form) {
        const errores = [];
        form.querySelectorAll('input, textarea').forEach(input => {
            if (!input.validity.valid) {
                errores.push(`${input.name} no es válido`);
            }
        });
        if (errores.length > 0) {
            alert(errores.join('\n'));
        } else {
            alert('Formulario enviado correctamente');
        }
    }

    // Generar Estadísticas de Uso
    function generarEstadisticas(reservas) {
        const totalReservas = reservas.length;
        const reservasPorConsola = reservas.reduce((acc, reserva) => {
            acc[reserva.consola] = (acc[reserva.consola] || 0) + 1;
            return acc;
        }, {});
        console.log('Total de reservas:', totalReservas);
        console.log('Reservas por consola:', reservasPorConsola);
    }

    // Agregar un Modo de Previsualización de Reserva
    function previsualizarReserva(reserva) {
        const previsualizacion = `
            Previsualización de Reserva
            ---------------------------
            Usuario: ${reserva.usuario}
            Consola: ${reserva.consola}
            Fecha: ${new Date(reserva.fecha).toLocaleString()}
            Duración: ${reserva.duracion} horas
        `;
        alert(previsualizacion);
    }

    // Manejo del Menú y Navegación
    const menuButton = document.getElementById('menu-button');
    const menu = document.getElementById('menu');
    const menuCloseButton = document.getElementById('menu-close-button');
    const menuLinks = menu.querySelectorAll('a');

    menuButton.addEventListener('click', function() {
        menu.classList.toggle('open');
    });

    menuCloseButton.addEventListener('click', function() {
        menu.classList.remove('open');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('open');
            const sectionId = this.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mostrar y Ocultar Secciones
    function mostrarSeccion(seccionId) {
        document.querySelectorAll('section').forEach(seccion => {
            seccion.style.display = 'none';
        });
        const seccionMostrar = document.getElementById(seccionId);
        if (seccionMostrar) {
            seccionMostrar.style.display = 'block';
        }
    }

    // Inicializar mostrando la sección de registro de usuario
    mostrarSeccion('registro-usuario');
});

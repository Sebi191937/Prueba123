// Función para mostrar y ocultar el menú lateral
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
}

// Función para cambiar entre las pestañas
function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
}

// Función para verificar la contraseña para el panel privado
function verifyPassword() {
  const password = document.getElementById('password').value;
  const adminPanel = document.getElementById('adminPanel');
  const correctPassword = 'admin123'; // Contraseña para el panel admin

  if (password === correctPassword) {
    adminPanel.classList.remove('hidden');
    document.getElementById('password').disabled = true;
  } else {
    alert('Contraseña incorrecta');
  }
}

// Función para actualizar el estado de las consolas
function updateConsoleStatus() {
  const xboxStatus = document.getElementById('xboxStatus').value;
  const statusPublico = document.getElementById('publicStatus');

  if (xboxStatus === 'ocupada') {
    statusPublico.textContent = 'Xbox está ocupada';
    statusPublico.style.color = 'red';
  } else {
    statusPublico.textContent = 'Xbox está desocupada';
    statusPublico.style.color = 'green';
  }
}

// Función para manejar la reserva
document.getElementById('reservationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const console = document.getElementById('console').value;
  const date = document.getElementById('date').value;
  const message = document.getElementById('message');

  if (!name || !console || !date) {
    message.textContent = 'Por favor, llena todos los campos.';
    message.style.color = 'red';
  } else {
    message.textContent = `Reserva realizada para ${name} en ${console} a las ${date}.`;
    message.style.color = 'green';
  }
});

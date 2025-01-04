const tabs = document.querySelectorAll('.tab');
const menu = document.getElementById('menu');
const publicStatus = document.getElementById('public-status');
const privateConsoles = document.getElementById('private-consoles');
const reservationsList = document.getElementById('reservations-list');
const reservationConfirmation = document.getElementById('reservation-confirmation');
const consoles = {
  Xbox: 4,
  PlayStation: 4,
  PC: 2,
};

// Show/Hide Menu
function toggleMenu() {
  menu.classList.toggle('hidden');
}

// Show Tab
function showTab(id) {
  tabs.forEach(tab => tab.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  if (id === 'status-publico') updatePublicStatus();
  if (id === 'status-privado') updatePrivateConsoles();
  if (id === 'estadisticas') renderStats();
  menu.classList.add('hidden'); // Close the menu after selecting a tab
}

// Notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '10px';
  notification.style.right = '10px';
  notification.style.background = '#444';
  notification.style.color = 'white';
  notification.style.padding = '10px';
  notification.style.borderRadius = '5px';
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Estadísticas
function renderStats() {
  const ctx = document.getElementById('stats-chart').getContext('2d');
  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  const counts = reservations.reduce((acc, r) => {
    acc[r.console] = (acc[r.console] || 0) + 1;
    return acc;
  }, {});

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Reservas por consola',
        data: Object.values(counts),
        backgroundColor: ['#0066ff', '#ff6600', '#00ff00'],
      }],
    },
  });
}

// Initialize
showTab('inicio');

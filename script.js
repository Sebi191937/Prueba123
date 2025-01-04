// Manejo de pestañas
const tabs = document.querySelectorAll('.tab');
const menu = document.getElementById('menu');
const publicStatus = document.getElementById('public-status');
const privateConsoles = document.getElementById('private-consoles');
const reservationsList = document.getElementById('reservations-list');

// Consolas disponibles
const consoles = {
  Xbox: 4,
  PlayStation: 4,
  PC: 2,
};

// Inicializar almacenamiento local
if (!localStorage.getItem('consoleStatus')) {
  const initialStatus = {};
  Object.keys(consoles).forEach(type => {
    for (let i = 1; i <= consoles[type]; i++) {
      initialStatus[`${type} ${i}`] = 'Desocupada';
    }
  });
  localStorage.setItem('consoleStatus', JSON.stringify(initialStatus));
}

if (!localStorage.getItem('reservations')) {
  localStorage.setItem('reservations', JSON.stringify([]));
}

// Mostrar pestañas
function showTab(id) {
  tabs.forEach(tab => tab.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  if (id === 'estadisticas') renderStats();
}

// Renderizar estadísticas
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

// Inicializar
showTab('inicio');

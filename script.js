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

// Initialize localStorage
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
  menu.classList.add('hidden'); // Close the menu after selecting a tab
}

// Request Private Access
function requestPrivateAccess() {
  const password = prompt('Introduce la contraseña:');
  if (password === 'admin') {
    showTab('status-privado');
  } else {
    alert('Contraseña incorrecta.');
  }
}

// Update Public Status
function updatePublicStatus() {
  const status = JSON.parse(localStorage.getItem('consoleStatus'));
  publicStatus.innerHTML = Object.keys(status)
    .map(
      key =>
        `<li style="color: ${
          status[key] === 'Desocupada' ? 'green' : 'red'
        }">${key}: ${status[key]}</li>`
    )
    .join('');
}

// Update Private Consoles
function updatePrivateConsoles() {
  const status = JSON.parse(localStorage.getItem('consoleStatus'));
  privateConsoles.innerHTML = Object.keys(status)
    .map(
      key =>
        `<div>${key}: 
        <select onchange="changeStatus('${key}', this.value)">
          <option value="Desocupada" ${
            status[key] === 'Desocupada' ? 'selected' : ''
          }>Desocupada</option>
          <option value="Ocupada" ${
            status[key] === 'Ocupada' ? 'selected' : ''
          }>Ocupada</option>
        </select>
      </div>`
    )
    .join('');
}

// Change Console Status
function changeStatus(key, value) {
  const status = JSON.parse(localStorage.getItem('consoleStatus'));
  status[key] = value;
  localStorage.setItem('consoleStatus', JSON.stringify(status));
  updatePublicStatus();
}

// Reservation Form Submission
document.getElementById('reservation-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const console = document.getElementById('console').value;
  const time = document.getElementById('time').value;

  const reservations = JSON.parse(localStorage.getItem('reservations'));
  reservations.push({ name, console, time, date: new Date().toISOString() });
  localStorage.setItem('reservations', JSON.stringify(reservations));

  reservationConfirmation.textContent = 'Reserva enviada.';
  setTimeout(() => (reservationConfirmation.textContent = ''), 3000);
  updateReservations();
});

// Update Reservations
function updateReservations() {
  const reservations = JSON.parse(localStorage.getItem('reservations'));
  const now = new Date();
  const filteredReservations = reservations.filter(
    r => now - new Date(r.date) < 7 * 24 * 60 * 60 * 1000
  );
  localStorage.setItem('reservations', JSON.stringify(filteredReservations));

  reservationsList.innerHTML = filteredReservations
    .map(
      r =>
        `<li>${r.name} - ${r.console} - ${r.time} 
          <button onclick="deleteReservation('${r.date}')">Borrar</button>
        </li>`
    )
    .join('');
}

// Delete Reservation
function deleteReservation(date) {
  const reservations = JSON.parse(localStorage.getItem('reservations'));
  const updatedReservations = reservations.filter(r => r.date !== date);
  localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  updateReservations();
}

// Initialize
updatePublicStatus();
updateReservations();

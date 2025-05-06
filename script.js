let chart;

async function loadData() {
  const response = await fetch('data.json');
  return await response.json();
}

function createChart(seasons, ppg, playerName) {
  const ctx = document.getElementById('ppgChart').getContext('2d');
  if (chart) chart.destroy(); // prevent duplicate charts

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: seasons,
      datasets: [{
        label: `${playerName} PPG`,
        data: ppg,
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        fill: false,
        tension: 0.2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Points Per Game'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Season'
          }
        }
      }
    }
  });
}

async function init() {
  const data = await loadData();
  const select = document.getElementById('playerSelect');

  function updateChart() {
    const player = select.value;
    createChart(data[player].seasons, data[player].ppg, player);
  }

  select.addEventListener('change', updateChart);
  updateChart(); // initial load
}

init();

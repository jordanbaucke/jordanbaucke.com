/**
 * Aggregate portfolio-card weights by data-sector and render a pie chart (Chart.js).
 */
(function () {
  function parsePct(card) {
    var els = card.querySelectorAll('.portfolio-pct');
    var sum = 0;
    els.forEach(function (el) {
      var m = el.textContent.match(/[\d.]+/);
      if (m) sum += parseFloat(m[0]);
    });
    return sum;
  }

  function aggregateBySector() {
    var cards = document.querySelectorAll('#portfolio .portfolio-card[data-sector]');
    var map = {};
    cards.forEach(function (card) {
      var sector = card.getAttribute('data-sector');
      if (!sector) return;
      map[sector] = (map[sector] || 0) + parsePct(card);
    });
    return map;
  }

  function sectorColors(count) {
    var base = [
      '#5c6bc0',
      '#26a69a',
      '#ef5350',
      '#ff9800',
      '#ab47bc',
      '#42a5f5',
      '#7cb342',
      '#8d6e63',
      '#78909c',
      '#ec407a',
      '#29b6f6'
    ];
    var out = [];
    for (var i = 0; i < count; i++) {
      out.push(base[i % base.length]);
    }
    return out;
  }

  function buildChart() {
    if (typeof Chart === 'undefined') return;

    var canvas = document.getElementById('portfolio-sector-chart');
    if (!canvas) return;

    var agg = aggregateBySector();
    var entries = Object.keys(agg).map(function (k) {
      return [k, agg[k]];
    });
    entries.sort(function (a, b) {
      return b[1] - a[1];
    });

    if (entries.length === 0) return;

    var labels = entries.map(function (e) {
      return e[0];
    });
    var data = entries.map(function (e) {
      return e[1];
    });

    var styles = getComputedStyle(document.documentElement);
    var fg = (styles.getPropertyValue('--text') || '#111').trim();
    var bg = (styles.getPropertyValue('--bg') || '#fff').trim();

    var ariaParts = entries.map(function (e) {
      return e[0] + ' ' + e[1].toFixed(2) + '%';
    });
    canvas.setAttribute('aria-label', 'Portfolio allocation by sector: ' + ariaParts.join('; ') + '.');

    var existing = Chart.getChart(canvas);
    if (existing) {
      existing.destroy();
    }

    new Chart(canvas.getContext('2d'), {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: sectorColors(labels.length),
            borderColor: bg,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: fg,
              boxWidth: 12,
              padding: 14,
              font: {
                family: "'Ubuntu', system-ui, sans-serif",
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                var v = ctx.dataset.data[ctx.dataIndex];
                return ctx.label + ': ' + Number(v).toFixed(2) + '%';
              }
            }
          }
        }
      }
    });
  }

  function init() {
    buildChart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', buildChart);
})();

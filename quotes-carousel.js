/**
 * Philosophy quotes carousel: show one quote at a time with Random and Next.
 */
(function () {
  function init() {
    var track = document.querySelector('.quotes-carousel-track');
    if (!track) return;

    var currentIndex = -1;

    function getQuotes() {
      return track.querySelectorAll('.philosophy-quote');
    }

    function showIndex(index) {
      var quotes = getQuotes();
      var n = quotes.length;
      if (n === 0) return;
      var i = ((index % n) + n) % n;
      quotes.forEach(function (q, j) {
        q.classList.toggle('active', j === i);
      });
      currentIndex = i;
    }

    function randomIndex(n) {
      return Math.floor(Math.random() * n);
    }

    function showRandom() {
      var quotes = getQuotes();
      var n = quotes.length;
      if (n === 0) return;
      var idx = randomIndex(n);
      if (n > 1) {
        while (idx === currentIndex) idx = randomIndex(n);
      }
      showIndex(idx);
    }

    function showNext() {
      var quotes = getQuotes();
      var n = quotes.length;
      if (n === 0) return;
      showIndex(currentIndex + 1);
    }

    var quotes = getQuotes();
    if (quotes.length === 0) return;
    showRandom();

    var btnRandom = document.getElementById('quotes-random');
    var btnNext = document.getElementById('quotes-next');
    if (btnRandom) btnRandom.addEventListener('click', showRandom);
    if (btnNext) btnNext.addEventListener('click', showNext);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

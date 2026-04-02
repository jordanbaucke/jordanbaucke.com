/**
 * Philosophy quotes carousel: show one quote at a time with Random and Next.
 */
(function () {
  function init() {
    var track = document.querySelector('.quotes-carousel-track');
    if (!track) return;

    var currentIndex = -1;
    var avatarByQuoteIndex = {
      "0": {
        label: "Gautama Buddha",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Buddha_in_Sarnath_Museum_%28Dhammajak_Mutra%29.jpg/330px-Buddha_in_Sarnath_Museum_%28Dhammajak_Mutra%29.jpg"
      },
      "1": {
        label: "Warren Buffett",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg/330px-Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg"
      },
      "2": {
        label: "Charlie Munger",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Charlie_Munger_%28cropped%29.jpg/330px-Charlie_Munger_%28cropped%29.jpg"
      },
      "3": {
        label: "Sid Vicious",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Sid_Vicious_1978_%28cropped%29.jpg/330px-Sid_Vicious_1978_%28cropped%29.jpg"
      },
      "4": {
        label: "Benjamin Franklin",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg/330px-Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg"
      },
      "5": {
        label: "Charlie Munger",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Charlie_Munger_%28cropped%29.jpg/330px-Charlie_Munger_%28cropped%29.jpg"
      },
      "6": {
        label: "Kottonmouth Kings",
        imageUrl: "media/kottonmouth-kings.jpg"
      },
      "7": {
        label: "Frank Herbert",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Frank_Herbert_1984_%28square%29.jpg/330px-Frank_Herbert_1984_%28square%29.jpg"
      },
      "8": {
        label: "Psalm 118:22",
        imageUrl: "media/psalm-118-22.jpg"
      },
      "9": {
        label: "Bob Marley",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Bob_Marley_1976_press_photo.jpg/330px-Bob_Marley_1976_press_photo.jpg"
      },
      "10": {
        label: "Bob Marley",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Bob_Marley_1976_press_photo.jpg/330px-Bob_Marley_1976_press_photo.jpg"
      },
      "11": {
        label: "Martin Luther King Jr.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/330px-Martin_Luther_King%2C_Jr..jpg"
      },
      "12": {
        label: "Genghis Khan",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/YuanEmperorAlbumGenghisPortrait.jpg/330px-YuanEmperorAlbumGenghisPortrait.jpg"
      },
      "13": {
        label: "Less Than Jake",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/BftA_Less_Than_Jake_20220710_022810826_%2852215383579%29_%28cropped%29.jpg/330px-BftA_Less_Than_Jake_20220710_022810826_%2852215383579%29_%28cropped%29.jpg"
      },
      "14": {
        label: "The Suicide Machines",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/The_Suicide_Machines_-_Devil%27s_Night_2020.jpg/330px-The_Suicide_Machines_-_Devil%27s_Night_2020.jpg"
      },
      "15": {
        label: "Rancid",
        imageUrl: "media/rancid-photo.jpg"
      },
      "16": {
        label: "Sublime",
        imageUrl: "media/sublime-band.jpg"
      },
      "18": {
        label: "Dolly Parton",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Dolly_Parton_at_%27Blue_Smoke_World_Tour%27_in_Knoxville.jpg/330px-Dolly_Parton_at_%27Blue_Smoke_World_Tour%27_in_Knoxville.jpg"
      },
      "19": {
        label: "Blaise Pascal",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Blaise_Pascal_Versailles.JPG/330px-Blaise_Pascal_Versailles.JPG"
      },
      "20": {
        label: "Reinhold Niebuhr",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Rev._Reinhold_Niebuhr_1927_Edit.jpg/330px-Rev._Reinhold_Niebuhr_1927_Edit.jpg"
      },
      "21": {
        label: "Abraham Lincoln",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Abraham_Lincoln_1863_Portrait_%283x4_cropped%29.jpg/330px-Abraham_Lincoln_1863_Portrait_%283x4_cropped%29.jpg"
      },
      "22": {
        label: "Masayoshi Son",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Masayoshi_Son_%28P066533-522034%2C_cropped%29.jpg/330px-Masayoshi_Son_%28P066533-522034%2C_cropped%29.jpg"
      },
      "23": {
        label: "Albert Einstein",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/330px-Albert_Einstein_Head.jpg"
      },
      "24": {
        label: "Pennywise",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Pennywise-Rock_im_Park_2014-_by_2eight_DSC9646.jpg/330px-Pennywise-Rock_im_Park_2014-_by_2eight_DSC9646.jpg"
      },
      "25": {
        label: "Lucky Boys Confusion",
        imageUrl: "media/lucky-boys-confusion.jpg"
      }
    };

    function initialsFromName(name) {
      if (!name) return "?";
      var clean = name.replace(/[^a-zA-Z0-9 ]+/g, " ").trim();
      if (!clean) return "?";
      var parts = clean.split(/\s+/).filter(Boolean);
      var first = parts[0] ? parts[0][0] : "";
      var last = parts.length > 1 ? parts[parts.length - 1][0] : "";
      return (first + last).toUpperCase() || first.toUpperCase() || "?";
    }

    function ensureAvatars() {
      var quotes = getQuotes();
      quotes.forEach(function (quote) {
        if (quote.querySelector('.quote-avatar')) return;

        var index = quote.getAttribute('data-quote-index');
        var meta = avatarByQuoteIndex[index] || {};
        var label = meta.label || "Quote source";

        var avatar = document.createElement('div');
        avatar.className = 'quote-avatar';
        avatar.setAttribute('aria-hidden', 'true');

        if (meta.imageUrl) {
          var img = document.createElement('img');
          img.className = 'quote-avatar-img';
          img.src = meta.imageUrl;
          img.alt = "";
          img.loading = "lazy";
          img.width = 56;
          img.height = 56;
          avatar.appendChild(img);
        } else {
          var placeholder = document.createElement('span');
          placeholder.className = 'quote-avatar-placeholder';
          placeholder.textContent = initialsFromName(label);
          avatar.title = label + " (placeholder)";
          avatar.appendChild(placeholder);
        }

        quote.insertBefore(avatar, quote.firstChild);
      });
    }

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
    ensureAvatars();
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

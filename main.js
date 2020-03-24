var images = '';
fetch('https://picsum.photos/v2/list?limit=12') // kreipiamės į API šiuo adresu iš "picsum.photos"
  .then(resp => resp.json()) // gautą rezultatą iš JS konvertuojame į JSON, susikalbėjimui su serveriu
  //    JSON suteikia galimybę laikyti „JavaScript“ objektus kaip tekstą.

  .then(function(data) {
    // "data" yra masyvas su objektais iš JSON, kuriuose yra paveiksliukų duomenys url, height, width ...
    data.forEach(function(img) {
      // "einame" per masyvą
      images +=
        '<div class = "cont"><img alt ="' +
        img.author +
        '" data-height ="' +
        img.width +
        '" data-width = "' +
        img.height +
        '" class="small" src="' +
        img.download_url +
        '"></div>'; //  ir iš masyvo darome didelį html stringą: ( img._ _ _ ) bus pagrindinis argumentas
    });
    document.querySelector('#small-container').innerHTML = images; // susirandame #small-container ir į jo vidų įdedame sugeneruotą stringą

    document.querySelectorAll('.small').forEach(function(img) {
      // uždedam personalinį klausytoją
      // "einame" per visus įdėtus img
      img.addEventListener('click', function() {
        // Kai klausytojas gauna signalą, tada pradeda vykti: šiuo atveju this yra konkretus small paveiksliukas
        document.querySelector('#big').src = this.src; // įdedame src paėmė iš small
        document.querySelector('#big').style.display = 'block'; // rodome didelį langų-stulpelį
        var h = this.dataset.height; // iš mažojo lango-stulpelio paimu aukštį,
        var w = this.dataset.width; // plotį,
        var author = this.alt; // autorių.
        var info = author + '\xa0\xa0\xa0 ' + h + ' px ' + ' * ' + w + ' px '; // sudedame viską į stringą

        document.querySelector('#info').innerHTML = info; // ir įkeliame į info bloką
      });
    });
  });

// ===============================================================

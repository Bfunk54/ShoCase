const jikanUrl = 'https://api.jikan.moe/v4/anime?q=';
const jikanOptions = {limit: '&limit_10', min_score: '&min_score'};
const anime1Btn = document.querySelector('#anime1');
const anime2Btn = document.querySelector('#anime2');
const anime3Btn = document.querySelector('#anime3');
const anime4Btn = document.querySelector('#anime4');


// Access the sidenav and add the javascript for it
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {inDuration: 450, outDuration: 350, draggable: true});
  });

  var elem = document.querySelector('.tabs'); var instance = M.Tabs.init(elem, {});

  async function getAnimeName() {
    const response = await fetch(jikanUrl);
    const data = await response.json();
    const newAnime  = data;
    const firstAnimeName  = data;

  }

anime1Btn.addEventListener("submit", e => {
    e.preventDefault();
    animeSearch = search.value.trim();

    if (!animeSearch) {
        alert("Please enter an anime name");
    } else {
        startSearch(animeSearch);
    }
})

anime2Btn.addEventListener("submit", e => {
  e.preventDefault();
  animeSearch = search.value.trim();

  if (!animeSearch) {
      alert("Please enter an anime name");
  } else {
      startSearch(animeSearch);
  }
})

anime2Btn.addEventListener("submit", e => {
  e.preventDefault();
  animeSearch = search.value.trim();

  if (!animeSearch) {
      alert("Please enter an anime name");
  } else {
      startSearch(animeSearch);
  }
})

anime2Btn.addEventListener("submit", e => {
  e.preventDefault();
  animeSearch = search.value.trim();

  if (!animeSearch) {
      alert("Please enter an anime name");
  } else {
      startSearch(animeSearch);
  }
})

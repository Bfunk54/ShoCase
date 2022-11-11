const jikanUrl = 'https://api.jikan.moe/v4/anime?q=';
const jikanOptions = {limit: '&10', min_score: '&min_score'};

// Access the sidenav and add the javascript for it
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {inDuration: 450, outDuration: 350, draggable: true});
  });

  async function getAnimeName() {
    const response = await fetch(jikanUrl);
    const data = await response.json();
    const newAnime  = data;
    const firstAnimeName  = data;

  }

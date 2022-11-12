const jikanUrl = 'https://api.jikan.moe/v4/anime?q=';
const jikanOptions = {limit: '&limit_10', min_score: '&min_score'};
const anime1Input = document.getElementById('anime1_inline');
const anime2Input = document.getElementById('anime2_inline');
const anime3Input = document.getElementById('anime3_inline');
const anime4Input = document.getElementById('anime4_inline');
const anime1Btn = document.getElementById('anime1_btn');
const anime2Btn = document.getElementById('anime2_btn');
const anime3Btn = document.getElementById('anime3_btn');
const anime4Btn = document.getElementById('anime4_btn');


async function startSearch(search) {

    fetch('https://api.jikan.moe/v4/anime?q=' + search + '&sfw&limit=5&type=anime')
    .then(response => response.json())
    .then(function (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            dataObj = { title: data[i].title, image: data[i].image_url }; 
            animeTitleArray.push(dataObj);
        }
        const animeArray = [];
        console.log(animeArray);
        addDivs(animeArray);
    })
    .catch(err => console.error(err));
};

function addDivs(data) {
    divTemplate = `<div class="col s3">
    <div class="addPlaylistCard card">
      <div class="card-image">
        <img class="addPlaylistCardImg" src="${data.img}">
        
        <a class="addAnimeBtn btn-floating halfway-fab waves-effect waves-light amber"><i class="material-icons">add</i></a>
      </div>
        <span class="card-title black-text">${data.title}</span>
  </div>
</div>  `;
for (let i = 0; i < data.results.length; i++) {
}

anime1Btn.addEventListener("click", e => {
    e.preventDefault();
    animeSearch = anime1Input.value.trim();
    console.log(animeSearch);
    if (!animeSearch) {
        alert("Please enter an anime name");
    } else {
        startSearch(animeSearch);
    }
});

anime2Btn.addEventListener("click", e => {
  e.preventDefault();
  animeSearch = anime2Input.value.trim();
  console.log(animeSearch);
  if (!animeSearch) {
      alert("Please enter an anime name");
  } else {
      startSearch(animeSearch);
  }
});

anime3Btn.addEventListener("click", e => {
  e.preventDefault();
  animeSearch = anime3Input.value.trim();
    console.log(animeSearch);
  if (!animeSearch) {
      alert("Please enter an anime name");
  } else {
      startSearch(animeSearch);
  }
});

anime4Btn.addEventListener("click", e => {
  e.preventDefault();
  animeSearch = anime4Input.value.trim();
  console.log(animeSearch);
  if (!animeSearch) {
      alert("Please enter an anime name");
  } else {
      startSearch(animeSearch);
  }
});
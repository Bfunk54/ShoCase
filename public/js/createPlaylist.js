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
const test2 = document.getElementById('test2Row');
const anime2InputDiv = document.getElementById('anime2Input');

async function startSearch(search) {

    fetch('https://api.jikan.moe/v4/anime?q=' + search + '&sfw&limit=4&type=anime&min_score=4')
    .then(response => response.json())
    .then(function (res) {
        console.log(res);
        const animeArray = [];
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].title && res.data[i].images.jpg.image_url ) {
            dataObj = { title: res.data[i].title, image: res.data[i].images.jpg.image_url }; 
            animeArray.push(dataObj);
            }
            else{
                animeArray.splice(i, 1);
            }
        }
        console.log(animeArray);
        addDivs(animeArray);
    })
    .catch(err => console.error(err));
};

function addDivs(data) {
    console.log(data);
for (let i = 0; i < data.length; i++) {
    divTemplate = `<div class="col s3">
    <div class="addPlaylistCard card">
      <div class="card-image">
        <img class="addPlaylistCardImg" src="${data[i].image}">
        
        <a class="addAnimeBtn btn-floating halfway-fab waves-effect waves-light amber"><i class="material-icons">add</i></a>
      </div>
        <span class="card-title black-text">${data[i].title}</span>
  </div>
</div>  `;
    test2.innerHTML += divTemplate;
    console.log(test2);
    }
    
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
  anime2InputDiv.classList.add('hide');
  console.log(anime2InputDiv);
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
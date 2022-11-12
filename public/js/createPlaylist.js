const jikanUrl = 'https://api.jikan.moe/v4/anime?q=';
const jikanOptions = {limit: '&limit_10', min_score: '&min_score'};
let jikanLimit = 4;
const anime1Input = document.getElementById('anime1_inline');
const anime2Input = document.getElementById('anime2_inline');
const anime3Input = document.getElementById('anime3_inline');
const anime4Input = document.getElementById('anime4_inline');
const anime1Btn = document.getElementById('anime1_btn');
const anime2Btn = document.getElementById('anime2_btn');
const anime3Btn = document.getElementById('anime3_btn');
const anime4Btn = document.getElementById('anime4_btn');
const anime1 = document.getElementById('animeRow1');
const anime2 = document.getElementById('animeRow2');
const anime3 = document.getElementById('animeRow3');
const anime4 = document.getElementById('animeRow4');
const anime1InputDiv = document.getElementById('anime1Input');
const anime2InputDiv = document.getElementById('anime2Input');
const anime3InputDiv = document.getElementById('anime3Input');
const anime4InputDiv = document.getElementById('anime4Input');

// Starts the search for anime
async function startSearch(search) {

    fetch('https://api.jikan.moe/v4/anime?q=' + search + '&sfw&limit=' + jikanLimit +'&type=anime&order_by=rating&sort=asc')
    .then(response => response.json())
    .then(function (res) {
        console.log(res.data);
        const animeArray = [];

        // Filter the anime to only show the ones that have an image
        res.data = res.data.filter( function checkData(search, index) {
            console.log(search.images.jpg.image_url);
            return search.images.jpg.image_url !== 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
        });
        console.log(res.data);
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

        // Send the anime with images to be added to the page
        addDivs(animeArray);
    })
    .catch(err => console.error(err));
};

// Adds the anime choice options to the page
function addDivs(data) {
    console.log(data);

    // for loop to add the anime each to their own containers on the page
for (let i = 0; i < data.length; i++) {
    // Template literal for anime divs
    divTemplate = `<div class="addAnimeCard col s3">
    <div class="addPlaylistCard card">
      <div class="card-image">
        <img class="addPlaylistCardImg" src="${data[i].image}">
        
        <a class="addAnimeBtn btn-floating halfway-fab waves-effect waves-light amber"><i class="material-icons">add</i></a>
      </div>
        <span class="card-title black-text">${data[i].title}</span>
  </div>
</div>  `;
    // Append the divs to the page
    switch (anime1 || anime2 || anime3 || anime4) {
        case anime1: anime1.innerHTML += divTemplate; 
            break;
        case anime2: anime2.innerHTML += divTemplate;
            break;
        case anime3: anime3.innerHTML += divTemplate;
            break;
        case anime4: anime4.innerHTML += divTemplate;
            break;
    }

    console.log(anime1);
    }
    
}

// Event listeners to search for animes when creating a playlist
let anime1BtnClick = false;

anime1Btn.addEventListener("click", e => {
    e.preventDefault();
    animeSearch = anime1Input.value.trim();
    console.log(animeSearch);
    anime1InputDiv.classList.add('hide');
    if (!animeSearch) {
        alert("Please enter an anime name");
    } else {
        startSearch(animeSearch);
    }
});

let anime3BtnClick = false;

anime2Btn.addEventListener("click", e => {
  e.preventDefault();
  animeSearch = anime2Input.value.trim();
  console.log(animeSearch);
  anime2InputDiv.classList.add('hide');
  if (!animeSearch) {
      alert("Please enter an anime name");
  } else {
      startSearch(animeSearch);
  }
});

let anime3BtnClick = false;

anime3Btn.addEventListener("click", e => {
  e.preventDefault();
  animeSearch = anime3Input.value.trim();
  anime3InputDiv.classList.add('hide');
    console.log(animeSearch);
  if (!animeSearch) {
      alert("Please enter an anime name");
  } else {
      startSearch(animeSearch);
  }
});

let anime4BtnClick = false;

anime4Btn.addEventListener("click", e => {
  e.preventDefault();
  animeSearch = anime4Input.value.trim();
  console.log(animeSearch);
  anime4InputDiv.classList.add('hide');
  if (!animeSearch) {
      alert("Please enter an anime name");
  } else {
      startSearch(animeSearch);
  }
});
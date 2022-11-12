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
const test2 = document.getElementById('test2Row');
const anime2InputDiv = document.getElementById('anime2Input');

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
    test2.innerHTML += divTemplate;
    console.log(test2);
    }
    
}

// Event listeners to search for animes when creating a playlist

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
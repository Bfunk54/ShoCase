const jikanUrl = "https://api.jikan.moe/v4/anime?q=";
const jikanOptions = { limit: "&limit_10", min_score: "&min_score" };
let jikanLimit = 4;
const anime1Input = document.getElementById("anime1_inline");
const anime2Input = document.getElementById("anime2_inline");
const anime3Input = document.getElementById("anime3_inline");
const anime4Input = document.getElementById("anime4_inline");
const anime1Btn = document.getElementById("anime1_btn");
const anime2Btn = document.getElementById("anime2_btn");
const anime3Btn = document.getElementById("anime3_btn");
const anime4Btn = document.getElementById("anime4_btn");
const anime1 = document.getElementById("animeRow1");
const anime2 = document.getElementById("animeRow2");
const anime3 = document.getElementById("animeRow3");
const anime4 = document.getElementById("animeRow4");
const anime1InputDiv = document.getElementById("anime1Input");
const anime2InputDiv = document.getElementById("anime2Input");
const anime3InputDiv = document.getElementById("anime3Input");
const anime4InputDiv = document.getElementById("anime4Input");
const createPlaylist = document.getElementById("createPlaylist");

// Starts the search for anime
async function startSearch(search) {
  const animeArray = [];
  fetch(
    "https://api.jikan.moe/v4/anime?q=" +
      search +
      "&sfw&limit=" +
      jikanLimit +
      "&type=anime&order_by=members&sort=desc"
  )
    .then((response) => response.json())
    .then(function (res) {
      console.log(res.data);
      if (res.data.length < 1) {
        alert("Enter a real anime name");
        throw res.statusText;
      } else {
        switch (
          anime1BtnClick ||
          anime2BtnClick ||
          anime3BtnClick ||
          anime4BtnClick
        ) {
          case anime1BtnClick:
            anime1InputDiv.classList.add("hide");
            break;
          case anime2BtnClick:
            anime2InputDiv.classList.add("hide");
            break;
          case anime3BtnClick:
            anime3InputDiv.classList.add("hide");
            break;
          case anime4BtnClick:
            anime4InputDiv.classList.add("hide");
            break;
        }
      }
      // Filter the anime to only show the ones that have an image
      res.data = res.data.filter(function checkData(search, index) {
        console.log(search.images.jpg.image_url);
        return (
          search.images.jpg.image_url !==
          "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
        );
      });
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].title && res.data[i].images.jpg.image_url) {
          dataObj = {
            anime_title: res.data[i].title,
            anime_image: res.data[i].images.jpg.image_url,
            watch_link: res.data[i].url,
            more_info: res.data[i].synopsis,
            api_id: res.data[i].mal_id,
          };
          animeArray.push(dataObj);
        } else {
          animeArray.splice(i, 1);
        }
      }
      console.log(animeArray);

      // Send the anime with images to be added to the page
      addDivs(animeArray);
    })
    .catch((err) => console.error(err));
}
let cnt0 = 0;
let cnt1 = 0;
let cnt2 = 0;
let cnt3 = 0;
// Adds the anime choice options to the page
function addDivs(data) {
  console.log(data);
  // for loop to add the anime each to their own containers on the page
  for (let i = 0; i < data.length; i++) {
    // Template literal for anime divs
    let divTemplate = `<div id="addAnimeCard${[
      i
    ]}${animeCnt}" class="addAnimeCard${[i]} addAnimeCard col">
    <div class="addPlaylistCard card">
      <div class="card-image">
        <img class="addPlaylistCardImg" src="${data[i].anime_image}">
        
        <a id='addAnimeBtn${[i]}${animeCnt}' data-action="addAnime${[i
    ]}" class="addAnimeBtn btn-floating halfway-fab waves-effect waves-light amber"><i class="material-icons">add</i></a>
      </div>
        <span class="animeNameText card-title black-text">${data[i].anime_title}</span>
  </div>
</div>  `;
    // Append the divs to the page
    switch (
      anime1BtnClick ||
      anime2BtnClick ||
      anime3BtnClick ||
      anime4BtnClick
    ) {
      case anime1BtnClick:
        anime1.innerHTML += divTemplate;
        break;
      case anime2BtnClick:
        anime2.innerHTML += divTemplate;
        break;
      case anime3BtnClick:
        anime3.innerHTML += divTemplate;
        break;
      case anime4BtnClick:
        anime4.innerHTML += divTemplate;
        break;
    }

    console.log(anime1);
  }

  let add_AnimeBtn0 = document.getElementById(`addAnimeBtn0${[animeCnt]}`);
  let add_AnimeBtn1 = document.getElementById(`addAnimeBtn1${[animeCnt]}`);
  let add_AnimeBtn2 = document.getElementById(`addAnimeBtn2${[animeCnt]}`);
  let add_AnimeBtn3 = document.getElementById(`addAnimeBtn3${[animeCnt]}`);
  let animeDiv0 = document.getElementById(`addAnimeCard0${[animeCnt]}`);
  let animeDiv1 = document.getElementById(`addAnimeCard1${[animeCnt]}`);
  let animeDiv2 = document.getElementById(`addAnimeCard2${[animeCnt]}`);
  let animeDiv3 = document.getElementById(`addAnimeCard3${[animeCnt]}`);

  add_AnimeBtn0.addEventListener("click", (e) => {
    cnt0++;
    console.log(cnt0);
    e.preventDefault();
    console.log("0 clicked");
    add_AnimeBtn0.classList.add("hide");
    animeDiv1.classList.add("hide");
    animeDiv2.classList.add("hide");
    animeDiv3.classList.add("hide");
    data.splice(1, 3);
    console.log(data[0]);
    newPlaylistAnime.push(data[0]);
    console.log(newPlaylistAnime);
    if (cnt0 + cnt1 + cnt2 + cnt3 === 4) {
      savePlaylist();
    }
  });

  add_AnimeBtn1.addEventListener("click", (e) => {
    cnt1++;
    e.preventDefault();
    console.log("1 clicked");
    add_AnimeBtn1.classList.add("hide");
    animeDiv0.classList.add("hide");
    animeDiv2.classList.add("hide");
    animeDiv3.classList.add("hide");
    data.splice(0, 1);
    data.splice(1, 2);
    console.log(data[0]);
    newPlaylistAnime.push(data[0]);
    console.log(newPlaylistAnime);
    if (cnt0 + cnt1 + cnt2 + cnt3 === 4) {
      savePlaylist();
    }
  });

  add_AnimeBtn2.addEventListener("click", (e) => {
    cnt2++;
    e.preventDefault();
    console.log("2 clicked");
    add_AnimeBtn2.classList.add("hide");
    animeDiv0.classList.add("hide");
    animeDiv1.classList.add("hide");
    animeDiv3.classList.add("hide");
    data.splice(0, 2);
    data.splice(1, 1);
    console.log(data[0]);
    newPlaylistAnime.push(data[0]);
    console.log(newPlaylistAnime);
    console.log(cnt0 + cnt1 + cnt2 + cnt3);

    if (cnt0 + cnt1 + cnt2 + cnt3 === 4) {
      savePlaylist();
    }
  });

  add_AnimeBtn3.addEventListener("click", (e) => {
    cnt3++;
    e.preventDefault();
    console.log("3 clicked");
    add_AnimeBtn3.classList.add("hide");
    animeDiv0.classList.add("hide");
    animeDiv1.classList.add("hide");
    animeDiv2.classList.add("hide");
    data.splice(0, 3);
    console.log(data[0]);
    newPlaylistAnime.push(data[0]);
    console.log(newPlaylistAnime);
    if (cnt0 + cnt1 + cnt2 + cnt3 === 4) {
      savePlaylist();
    }
  });

  switch (
    anime1BtnClick ||
    anime2BtnClick ||
    anime3BtnClick ||
    anime4BtnClick
  ) {
    case anime1BtnClick:
      anime1BtnClick = false;
      break;
    case anime2BtnClick:
      anime2BtnClick = false;
      break;
    case anime3BtnClick:
      anime3BtnClick = false;
      break;
    case anime4BtnClick:
      anime4BtnClick = false;
      break;
  }
}

// Event listeners to search for animes when creating a playlist
let anime1BtnClick = false;
let anime1BtnClicked = false;
let animeCnt = 0;

anime1Btn.addEventListener("click", (e) => {
  e.preventDefault();
  animeSearch = anime1Input.value.trim();
  console.log(animeSearch);
  if (!animeSearch) {
    alert("Please enter an anime name");
  } else {
    animeCnt = 0;

    anime1BtnClick = true;
    startSearch(animeSearch);
  }
});

let anime2BtnClick = false;
let anime2BtnClicked = false;

anime2Btn.addEventListener("click", (e) => {
  e.preventDefault();
  animeSearch = anime2Input.value.trim();
  console.log(animeSearch);
  if (!animeSearch) {
    alert("Please enter an anime name");
  } else {
    animeCnt = 1;

    anime2BtnClick = true;
    startSearch(animeSearch);
  }
});

let anime3BtnClick = false;
let anime3BtnClicked = false;

anime3Btn.addEventListener("click", (e) => {
  e.preventDefault();
  animeSearch = anime3Input.value.trim();
  console.log(animeSearch);
  if (!animeSearch) {
    alert("Please enter an anime name");
  } else {
    anime3BtnClick = true;
    animeCnt = 2;
    startSearch(animeSearch);
  }
});

let anime4BtnClick = false;
let anime4BtnClicked = false;

anime4Btn.addEventListener("click", (e) => {
  e.preventDefault();
  animeSearch = anime4Input.value.trim();
  console.log(animeSearch);
  if (!animeSearch) {
    alert("Please enter an anime name");
  } else {
    anime4BtnClick = true;
    animeCnt = 3;
    startSearch(animeSearch);
  }
});

let newPlaylistAnime = [];

function savePlaylist() {
  switch (cnt0 + cnt1 + cnt2 + cnt3 === 4) {
    case true:
      const playlistName = document.querySelector(".newPlaylistName");
      playlistName.classList.remove("hide");
      createPlaylist.innerHTML += ` <a id='createPlaylistBtn' class="btn-floating halfway-fab waves-effect waves-light amber"><i class="createPlaylistBtn material-icons">save</i></a>`;
      let savePlaylistBtn = document.getElementById("createPlaylistBtn");
      savePlaylistBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let newPlaylistNameData = document.getElementById(
          "create_playlist_inline"
        );
        console.log(newPlaylistNameData.value);
        if (newPlaylistNameData.value) {
          let newPlaylistName = newPlaylistNameData.value;
          console.log("Your new playlist is called: " + newPlaylistName);
          console.log("The anime in it are");
          console.log(newPlaylistAnime);
          createPlaylistForm(newPlaylistName);
        } else {
          alert("Please enter a playlist name");
        }
      });
      break;
    default:
      console.log("nope");
      break;
  }
}

const createPlaylistForm = async (playlistName) => {
  var animes = newPlaylistAnime;
  var title = playlistName;
  console.log(JSON.stringify({ animes, title }));
  const response = await fetch("/api/playlists", {
    method: "POST",
    body: JSON.stringify({ animes, title }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

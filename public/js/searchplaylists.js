window.onload = function(){
const searchInput = document.getElementById('search-submit');
searchInput.addEventListener('submit', playlistSearchHandler);
}


const playlistSearchHandler = async (event) => {
    event.preventDefault();
    const searchText = document.querySelector('#search_inline').value.trim();
    console.log(searchText)
    location.replace(`/playlists/search/${searchText}`)
}







const playlistSearchHandler = async (event) => {
    event.preventDefault();
    const searchText = document.querySelector('#search_inline').value.trim();
    console.log(searchText)
    location.replace(`/playlists/search/${searchText}`)
}

const playlistSearchHandler2 = async (event) => {
    event.preventDefault();
    const searchText2 = document.querySelector('#search_inline2').value.trim();
    console.log(searchText2)
    location.replace(`/playlists/search/${searchText2}`)
}


searchInput = document.getElementById('search-submit');
searchInput.addEventListener('submit', playlistSearchHandler);

searchInput2 = document.getElementById('search-submit2');
searchInput2.addEventListener('submit', playlistSearchHandler2);





const playlistSearchHandler = async (event) => {
    event.preventDefault();
    const searchText = document.querySelector('#playlist-search').value.trim();

    const response = await fetch('/api/playlists', {
        method: 'GET',
        body: JSON.stringify( { searchText } ),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        console.log(response);
    } else {
        console.log(response.statusText)
    }
}


document.querySelector('#playlist-search').addEventListener('submit', playlistSearchHandler);
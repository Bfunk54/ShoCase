// const checkIfLiked = (favoritesArr) => {
//     console.log(favoritesArr)
//     // favoritesArr.forEach()
//     // if (favorites.playlist_id = playlist.id) {
//     //     return true;
//     // } else {
//     //     return false;
//     // }
// };



const favoritePlaylist = async (id) => {
    playlist_id = id;
    await fetch(`/api/favorites`, {
        method: 'POST',
        body: JSON.stringify({
            playlist_id
        }),
    headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(document.location.reload())
    .catch(err => console.log(err));
}






const handlePlaylistFavorite = async (e) => {
    // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();
    
    const playlist = e.target;
    const playlistId = playlist.parentElement.getAttribute('data-id');


    const response = await favoritePlaylist(playlistId);

    return response;

};



const favoriteBtn = document.querySelectorAll('.favorite-btn')
favoriteBtn.forEach((btn) => btn.addEventListener('click', handlePlaylistFavorite));
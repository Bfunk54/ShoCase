// const favoritePlaylist = async (id) => {
//     const playlist_id = id
//     await fetch(`/api/favorites`, {
//         method: 'POST',
//         body: JSON.stringify({
//             playlist_id
//         }),
//     headers: {
//             'Content-Type': ''
//         }
//     })
// }






const handlePlaylistFavorite = async (e) => {
    // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();

    const playlist = e.target;
    const playlistId = playlist.parentElement.getAttribute('data-id');


    const response = await favoritePlaylist(playlistId);

    if (response.ok) {
        document.location.reload();
    } else {
        alert('failed to favorite playlist')
    }
};



const favoriteBtn = document.querySelectorAll('.favorite-btn')
favoriteBtn.forEach((btn) => btn.addEventListener('click', handlePlaylistFavorite));
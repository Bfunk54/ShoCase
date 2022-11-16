const deletePlaylist = async (id) =>
  await fetch(`/api/playlists/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(document.location.reload())
  .catch(err => console.log(err))



const handlePlaylistDelete = async (e) => {
    // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();
  
    const playlist = e.target;
    const playlistId = playlist.getAttribute('data-id');
    console.log(playlistId)

    const response = await deletePlaylist(playlistId);

    return response;
  };


const deleteBtn = document.querySelectorAll('.delete-btn')
deleteBtn.forEach((btn) => btn.addEventListener('click', handlePlaylistDelete));

const deletePlaylist = async (id) =>
  await fetch(`/api/playlists/${id}`, {
    method: 'DELETE'
  });



const handlePlaylistDelete = async (e) => {
    // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();
  
    const playlist = e.target;
    const playlistId = playlist.parentElement.getAttribute('data-id');

    const response = await deletePlaylist(playlistId);

    if (response.ok) {
      document.location.reload();
    } else {
      alert('failed to delete playlist')
    }
  };



document.getElementById('delete-btn').addEventListener('click', handlePlaylistDelete);
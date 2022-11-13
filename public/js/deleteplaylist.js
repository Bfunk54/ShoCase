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


const deleteBtn = document.querySelectorAll('.delete-btn')
deleteBtn.forEach((btn) => btn.addEventListener('click', handlePlaylistDelete));


// Javascript for toolbar animation
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('#delete-toolbar');
  var instances = M.FloatingActionButton.init(elems, {
    toolbarEnabled: true
  });
});

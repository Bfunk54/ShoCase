const editPlaylist = async (id, newTitle) => {

  await fetch(`/api/playlists/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      newTitle
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
   .then(response => response.json())
   .then(document.location.reload())
   .catch(err => console.log(err));
};




const handlePlaylistEdit = async (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();



  const playlist = e.target;
  const playlistId = playlist.parentElement.getAttribute('data-id');
  const saveBtn = playlist.parentElement.parentElement.nextElementSibling;
  saveBtn.classList.remove('hide');
  const newInput = document.createElement(`input`);
  newInput.setAttribute('id', 'newTitle')
  const originalTitle = document.getElementById('playlist-title').textContent;
  newInput.value = originalTitle;
  const originalTitleEl = document.getElementById('playlist-title');
  originalTitleEl.parentElement.insertBefore(newInput, originalTitleEl);
  originalTitleEl.remove();

  const newTitle = document.getElementById('newTitle').value;
  console.log(newTitle);
};

const handlePlaylistSave = async (e) => {
  e.stopPropagation();
  const playlist = e.target;
  const playlistId = playlist.parentElement.getAttribute('data-id');
  const newTitle = document.getElementById('newTitle').value;
  console.log(newTitle);
  
  const response = await editPlaylist(playlistId, newTitle)

  return response;
};


const editBtn = document.querySelectorAll('.edit-btn')
editBtn.forEach((btn) => btn.addEventListener('click', handlePlaylistEdit));

const saveButton = document.querySelectorAll('.save-btn')
saveButton.forEach((btn) => btn.addEventListener('click', handlePlaylistSave))
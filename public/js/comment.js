const commentFormHandler = async function (event) {
    event.preventDefault();

    const post_idString = document.querySelector('#post-id').innerHTML;
    const playlist_id = +post_idString
    const content = document.querySelector('#comment-body').value;

    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                content,
                playlist_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            response.json()
        }
    }
};

document.querySelector('#new-comment-form').addEventListener("click", commentFormHandler);
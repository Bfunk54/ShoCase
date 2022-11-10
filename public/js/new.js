const postFormHandler = async function (event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-body').value;

    if (content && title) {
        await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.location.reload();
    }
};

document.querySelector('#new-post-form').addEventListener("click", postFormHandler);
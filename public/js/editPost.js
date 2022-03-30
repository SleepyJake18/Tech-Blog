const newPostFormHandler = async (event) => {
    event.preventDefault();
    console.log(`here`);

    const title = document.querySelector('#edit-post-title').value;
    const content = document.querySelector('#edit-post-content').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    if (title && content) {
      console.log(title);
        const response = await fetch(`/api/users/edit/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            alert('Post made successfully');
          } else {
            alert('Failed to make post');
          }
        }
    }

    document
  .querySelector('.editPostForm')
  .addEventListener('submit', newPostFormHandler);
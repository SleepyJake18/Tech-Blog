const newPostFormHandler = async (event) => {
    event.preventDefault();
    console.log(`here`);

    const title = document.querySelector('#new-post-title').value;
    const content = document.querySelector('#new-post-content').value;

    if (title && content) {
      console.log(title);
        const response = await fetch('/api/users/new/post', {
            method: 'POST',
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
  .querySelector('.newPostForm')
  .addEventListener('submit', newPostFormHandler);
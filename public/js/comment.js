const newCommentFormHandler = async (event) => {
    event.preventDefault();
    console.log(`here`);

    const content = document.querySelector('#newComment').value;
    const comment_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];


    if (content) {
      console.log(content);
        const response = await fetch('/api/users/new/comment', {
            method: 'POST',
            body: JSON.stringify({ content, comment_id }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            alert('Comment made successfully');
          } else {
            alert('Failed to add comment');
          }
        }
    }

    document
  .querySelector('.newCommentForm')
  .addEventListener('click', newCommentFormHandler);
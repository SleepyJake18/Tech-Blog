const editCommentFormHandler = async (event) => {
    event.preventDefault();
    console.log(`here`);

    const content = document.querySelector('#editComment').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    if (content) {
      console.log(content);
        const response = await fetch(`/api/users/edit/comment/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            alert('Comment edited successfully');
          } else {
            alert('Failed to edit comment');
          }
        }
    }

    document
  .querySelector('.editCommentForm')
  .addEventListener('click', editCommentFormHandler);
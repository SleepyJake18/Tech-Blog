const postDeleteFunction = async (event) => {
    event.preventDefault();
    console.log(`here`);

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      console.log(id);
        const response = await fetch(`/api/users/post/delete/${id}`, {
            method: 'DELETE',
        })

        if (response.ok) {
            alert('Post deleted successfully');
          } else {
            alert('Failed to delete post');
          }
        
    }

    document
  .querySelector('.deleteBtn')
  .addEventListener('click', postDeleteFunction);
const commentDeleteFunction = async (event) => {
    event.preventDefault();
    console.log(`here`);

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      console.log(id);
        const response = await fetch(`/api/users/comment/delete/${id}`, {
            method: 'DELETE',
        })

        if (response.ok) {
            alert('Comment Deleted successfully');
          } else {
            alert('Failed to delete comment');
          }
        
    }

    document
  .querySelector('.commentDeleteBtn')
  .addEventListener('submit', commentDeleteFunction);
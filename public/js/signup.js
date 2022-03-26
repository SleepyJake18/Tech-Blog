const loginFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const name = document.querySelector('#name-login').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password && name) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
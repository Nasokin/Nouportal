document.getElementById('settings-form').addEventListener('submit', function(event) {
    // Prevent the form from submitting
    event.preventDefault();
  
    // Get the username and password
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
  
    // Save the username and password
    browser.storage.sync.set({
      username: username,
      password: password
    }).then(() => {;
        // Display a success message
        let message = document.createElement('p');
        message.textContent = 'Saved successfully!';
        document.body.appendChild(message);
    });
  });  
console.log("Options loaded");

// Set default values for testing
document.getElementById("username").value = "testname";
document.getElementById("password").value = "testpass";

document.getElementById("settings-form").addEventListener("submit", function(event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the username and password
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  console.log("Username: " + username + ", Password: " + password);  

  // Save the username and password
  browser.storage.sync.set({
      "username": username,
      "password": password
  })
  .then(() => {
    // Display a success message
    let message = document.createElement("p");
    message.textContent = "Saved successfully!";
    document.body.appendChild(message);

    // Get and log the stored values
    return browser.storage.sync.get(["username", "password"]);
  })
  .then((res) => {
    console.log("Stored username: " + res.username);
    console.log("Stored password: " + res.password);
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
});

// Set default values for testing
document.getElementById("USER_ID").value = "";
document.getElementById("USER_PASSWORD").value = "";

document.getElementById("settings-form").addEventListener("submit", function(event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the username and password
  let username = document.getElementById("USER_ID").value;
  let password = document.getElementById("USER_PASSWORD").value;

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

    return browser.storage.sync.get(["username", "password"]);
  })
});

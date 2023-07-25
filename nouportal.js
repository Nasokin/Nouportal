// Function that fills the username and password fields
function fillCredentials() {
    // Get the username and password
    browser.storage.sync.get(["username", "password"]).then((res) => {
        let username = res.username;
        let password = res.password;

        // Get the username and password fields
        let usernameField = document.getElementById("USER_ID");
        let passwordField = document.getElementById("USER_PASSWORD");

        // Check if the fields exist
        if (usernameField && passwordField) {
            // Fill the username field if it's empty
            if (usernameField.value === "") {
                usernameField.value = username;
            }

            // Fill the password field if it's empty
            if (passwordField.value === "") {
                passwordField.value = password;
            }
            console.log(usernameField.value + " " + passwordField.value);
        } else {
            // If the fields do not exist, try again in 100ms
            setTimeout(() => {
                fillCredentials();
                clickPortalLoginButton();
            }, 100);
        }
    });
}

// Function that clicks the login button of the portal page
function clickPortalLoginButton() {
    // Get all input elements
    let inputs = document.getElementsByTagName("input");

    // Check if there are any input elements
    if (inputs) {
        // Loop through all input elements
        for (let i = 0; i < inputs.length; i++) {
            // If this is the login button, click it
            if (inputs[i].value.trim() === "Login") {
                inputs[i].click();
                break;
            }
        }
    } else {
        // If there are no input elements, try again in 100ms
        setTimeout(clickPortalLoginButton, 100);
    }
}

// Function that clicks the login button of CLE
function clickCLELoginButton() {
    // Get the login button
    let loginButton = document.getElementById("loginsaml");

    // Check if the button exists
    if (loginButton) {
        // Click the button
        loginButton.click();
    } else {
        // If the button does not exist, try again in 100ms
        setTimeout(clickCLELoginButton, 100);
    }
}

function runFunctions() {
    console.log("runFunctions called");
    // Check the current page URL
    if (window.location.href.includes("ou-idp.auth.osaka-u.ac.jp/idp/")) {
        fillCredentials();
    } else if (window.location.href.includes("cle.osaka-u.ac.jp")) {
        clickCLELoginButton();
    }
}

console.log("Script executed");

// Call the appropriate function when the page loads
if (document.readyState === "complete" || 
    (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    runFunctions();
} else {
    document.addEventListener("DOMContentLoaded", runMyFunctions);
}
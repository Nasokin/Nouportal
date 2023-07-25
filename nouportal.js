// Function that fills the username and password fields
function fillCredentials() {
    // Get the username and password
    browser.storage.sync.get(["username", "password"]).then((res) => {
        let username = res.username;
        let password = res.password;

        // Check if the username and password are not empty
        if (username !== "" && password !== "") {
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
                clickPortalLoginButton();
            } else {
                // If the fields do not exist, try again in 100ms
                setTimeout(() => {
                    fillCredentials();
                }, 100);
            }
        }
    });
}

// Function that clicks the login button of the portal page
function clickPortalLoginButton() {
    // Get all input elements
    let portalLoginButton = document.querySelector('input[type="button"]');

    // Check if there are any input elements
    if (portalLoginButton) {
        // Click the button
        portalLoginButton.click();
    } else {
        // If there are no input elements, try again in 100ms
        setTimeout(clickPortalLoginButton, 100);
    }
}

// Function that clicks the login button of CLE
function clickCLELoginButton() {
    // Get the login button
    let CLELoginButton = document.getElementById("loginsaml");

    // Check if the button exists
    if (CLELoginButton) {
        // Click the button
        CLELoginButton.click();
    } else {
        // If the button does not exist, try again in 100ms
        setTimeout(clickCLELoginButton, 100);
    }
}

function runFunctions() {
    // Check the current page URL
    if (window.location.href.includes("ou-idp.auth.osaka-u.ac.jp/idp/")) {
        fillCredentials();
    } else if (window.location.href.includes("cle.osaka-u.ac.jp")) {
        clickCLELoginButton();
    }
}

// Call the appropriate function when the page loads
if (document.readyState === "complete" || 
    (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    runFunctions();
} else {
    document.addEventListener("DOMContentLoaded", runMyFunctions);
}
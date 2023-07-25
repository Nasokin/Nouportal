// Function that fills the username and password fields
function fillCredentials() {
    // Get the username and password
    browser.storage.sync.get(['username', 'password']).then((res) => {
        let username = res.username;
        let password = res.password;

        // Get the username and password fields
        let usernameField = document.getElementById('USER_ID');
        let passwordField = document.getElementById('USER_PASSWORD');

        // Check if the fields exist
        if (usernameField && passwordField) {
            // Fill the username field if it's empty
            if (usernameField.value === '') {
                usernameField.value = username;
            }

            // Fill the password field if it's empty
            if (passwordField.value === '') {
                passwordField.value = password;
            }
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
    let inputs = document.getElementsByTagName('input');

    // Check if there are any input elements
    if (inputs) {
        // Loop through all input elements
        for (let i = 0; i < inputs.length; i++) {
            // If this is the login button, click it
            if (inputs[i].value.trim() === '&nbsp;Login&nbsp;') {
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
    let loginButton = document.getElementById('loginsaml');

    // Check if the button exists
    if (loginButton) {
        // Click the button
        loginButton.click();
        console.log('Clicked CLE login button');
    } else {
        // If the button does not exist, try again in 100ms
        setTimeout(clickCLELoginButton, 100);
    }
}

// Call the appropriate function when the page loads
window.addEventListener('load', function() {
    // Check the current page URL
    if (window.location.href.startsWith('https://ou-idp.auth.osaka-u.ac.jp/idp/sso_redirect?')) {
        // Fill the username and password fields on the portal page
        fillCredentials();
    } else if (window.location.href.startsWith('https://www.cle.osaka-u.ac.jp/')) {
        // Click the login button on the CLE page
        clickCLELoginButton();
    }
});
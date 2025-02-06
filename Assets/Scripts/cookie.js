// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Function to check if a cookie exists
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Check if the cookieConsent cookie is set and hide the banner if it is
  function checkCookieConsent() {
    if (getCookie('cookieConsent')) {
      document.getElementById('cookieConsent').style.display = 'none';
    }
  }

  // When the user clicks the accept button, set the cookie and hide the banner
  document.getElementById('acceptCookies').addEventListener('click', function() {
    setCookie('cookieConsent', 'true', 30); // Cookie valid for 30 days
    document.getElementById('cookieConsent').style.display = 'none';
  });

  // Run the check on page load
  checkCookieConsent();
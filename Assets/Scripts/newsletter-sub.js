const url =
  'https://script.google.com/macros/s/AKfycbzS1UKS3bdv1yMsWE9hWyKgLdvrnZj7ghrWps2RUViIuCRfzI47f9-idqJ8bkeOWb0I/exec';

document
  .getElementById('subscribe-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email-input');
    const submitButton = document.getElementById("subscribe-btn");
    const errorMessage = document.getElementById('email-error') || document.createElement('p');
    const successMessage = document.getElementById('email-success') || document.createElement('p');

    errorMessage.id = 'email-error';
    errorMessage.classList.add('form-message', 'error-message');
    errorMessage.style.display = 'none';
    if (!document.getElementById('email-error')) {
      document.getElementById('subscribe-form').appendChild(errorMessage);
    }

    successMessage.id = 'email-success';
    successMessage.classList.add('form-message', 'success-message');
    successMessage.style.display = 'none';
    if (!document.getElementById('email-success')) {
      document.getElementById('subscribe-form').appendChild(successMessage);
    }

    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@aston\.ac\.uk$/i; // Ensure only Aston University emails

    if (!emailPattern.test(email)) {
      errorMessage.innerHTML = '<br>❌ Please enter a valid Aston University email <br> (must end with @aston.ac.uk).';
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
      return;
    }

    errorMessage.style.display = 'none';
    submitButton.disabled = true;
    submitButton.innerText = "Submitting...";
    

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        emailInput.value = '';
        console.log('Successful', data);
        if (data.status === 'OK') {
          successMessage.textContent = '✅ You have successfully subscribed!';
          submitButton.innerText = "Subscribe";
          successMessage.style.display = 'block';
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 5000);
        } else {
          errorMessage.innerHTML = '❌ Subscription failed. Please try again later.';
          submitButton.innerText = "Subscribe";
          errorMessage.style.display = 'block';
        }
      })
      .catch((err) => {
        console.log('err', err);
        errorMessage.innerHTML = '❌ Error! Please try again.';
        submitButton.innerText = "Subscribe";
        errorMessage.style.display = 'block';
      });
  });
const url =
  'https://script.google.com/macros/s/AKfycbzS1UKS3bdv1yMsWE9hWyKgLdvrnZj7ghrWps2RUViIuCRfzI47f9-idqJ8bkeOWb0I/exec';

document
  .getElementById('subscribe-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

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
        console.log('Successful', data);
        this.reset();
      })
      .catch((err) => console.log('err', err));
  });
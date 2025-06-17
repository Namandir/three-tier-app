document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('https://backend-layer2-fxdqbegbfvf6cwg3.southeastasia-01.azurewebsites.net/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (response.ok) {
    document.getElementById('message').textContent = 'Login successful!';
  } else {
    document.getElementById('message').textContent = result.message || 'Login failed';
  }
});

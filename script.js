document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/login', {  // 👈 fixed relative URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const result = await response.text();

  if (response.ok) {
    document.getElementById('message').textContent = 'Login successful!';
  } else {
    document.getElementById('message').textContent = result || 'Login failed';
  }
});

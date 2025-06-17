const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ REPLACE this with your real frontend URL
const corsOptions = {
  origin: 'https://mango-beach-006bb9800.2.azurestaticapps.net', // 👈 this is your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Dummy users for now (replace with DB later)
const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' }
];

// Login route with logging
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login:', username, password);

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

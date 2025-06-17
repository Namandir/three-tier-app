const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your frontend URL
const corsOptions = {
  origin: 'https://mango-beach-006bb9800.2.azurestaticapps.net',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ PostgreSQL config
const pool = new Pool({
  user: 'dbadmin',
  host: 'flexible-db-layer.postgres.database.azure.com',
  database: 'postgres',
  password: 'Ervin000@',
  port: 5432,
  ssl: true // Required for Azure
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const result = await pool.query(query, [username, password]);

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Backend is running with PostgreSQL');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

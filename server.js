const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/user');
const connectDB = require('./config/db');

dotenv.config();

const PORT = process.env.RUNNING_PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Notes API. Use /api/tasks for task operations.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

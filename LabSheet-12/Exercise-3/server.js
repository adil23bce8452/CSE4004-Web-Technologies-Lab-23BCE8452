const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Connection Error:', err));

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to my server');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
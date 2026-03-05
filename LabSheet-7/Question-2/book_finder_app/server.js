const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serves your frontend

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let db, booksCollection;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('BookFinderDB');
        booksCollection = db.collection('books');
        console.log("Connected to MongoDB successfully!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
connectDB();

// 1. Search Books by Title
app.get('/books/search', async (req, res) => {
    try {
        const titleQuery = req.query.title;

        const books = await booksCollection.find({
            title: { $regex: titleQuery, $options: "i" }
        }).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Top Rated Books
app.get('/books/top', async (req, res) => {
    try {
        const books = await booksCollection.find({ rating: { $gte: 4 } }).limit(5).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Filter Books by Category
app.get('/books/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const books = await booksCollection.find({ 
            category: { $regex: new RegExp(`^${category}$`, 'i') } 
        }).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Sort Books by Price or Rating
app.get('/books/sort/:field', async (req, res) => {
    try {
        const field = req.params.field;

        let sortQuery = {};
        if (field === 'price') sortQuery = { price: 1 };
        if (field === 'rating') sortQuery = { rating: -1 };

        const books = await booksCollection.find().sort(sortQuery).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Pagination
app.get('/books', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const books = await booksCollection.find().skip(skip).limit(limit).toArray();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// HELPER ROUTE TO INSERT DATA
app.post('/books/seed', async (req, res) => {
    const dummyBooks = [
        { title: "JavaScript Essentials", author: "John Smith", category: "Programming", price: 450, rating: 4.5, year: 2023 },
        { title: "MongoDB Guide", author: "Jane Doe", category: "Database", price: 500, rating: 4.8, year: 2022 },
        { title: "Learn React", author: "Alice Johnson", category: "Programming", price: 300, rating: 3.9, year: 2024 },
        { title: "Node.js in Action", author: "Bob Brown", category: "Programming", price: 600, rating: 4.2, year: 2021 },
        { title: "SQL Basics", author: "Charlie White", category: "Database", price: 250, rating: 3.5, year: 2020 },
        { title: "Python Crash Course", author: "David Black", category: "Programming", price: 400, rating: 4.9, year: 2023 },
        { title: "Data Structures", author: "Eve Green", category: "CS", price: 550, rating: 4.1, year: 2019 }
    ];
    await booksCollection.deleteMany({});
    await booksCollection.insertMany(dummyBooks);
    res.json({ message: "Dummy data seeded successfully!" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
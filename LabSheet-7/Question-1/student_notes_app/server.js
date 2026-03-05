const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection Setup
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let db, notesCollection;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('StudentNotesDB');
        notesCollection = db.collection('notes');
        console.log("Connected to MongoDB successfully!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
connectDB();

// 1. View Notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await notesCollection.find().toArray();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Add Note
app.post('/notes', async (req, res) => {
    try {
        const { title, subject, description } = req.body;

        const today = new Date();
        const created_date = today.toISOString().split('T')[0];

        const newNote = { title, subject, description, created_date };

        const result = await notesCollection.insertOne(newNote);
        res.status(201).json({ message: "Note added successfully", id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Update Note (PUT)
app.put('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const result = await notesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title: title, description: description } }
        );

        res.json({ message: "Note updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Delete Note (DELETE)
app.delete('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await notesCollection.deleteOne({ _id: new ObjectId(id) });

        res.json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
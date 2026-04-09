const express = require('express');
const app = express();

const PORT = 3000;

// ------------------ GLOBAL MIDDLEWARE ------------------
app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[GLOBAL] ${req.method} ${req.url} - ${time}`);
    next(); // pass control
});

// ------------------ MIDDLEWARE LAYER 1 ------------------
const middleware1 = (req, res, next) => {
    console.log('Middleware 1 executed');
    next();
};

// ------------------ MIDDLEWARE LAYER 2 ------------------
const middleware2 = (req, res, next) => {
    console.log('Middleware 2 executed');
    next();
};

// ------------------ ROUTE LEVEL MIDDLEWARE ------------------
const routeMiddleware = (req, res, next) => {
    console.log('Route-specific middleware executed');
    next();
};

// ------------------ ROUTES ------------------

app.get('/chain', middleware1, middleware2, (req, res) => {
    res.send('Middleware chaining completed');
});

app.get('/route', routeMiddleware, (req, res) => {
    res.send('Route-level middleware executed');
});

app.get('/', (req, res) => {
    res.send('Home Page');
});

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    
    console.log(`Request received: ${req.method} ${req.url}`);
    
    res.setHeader('Content-Type', 'text/plain');
    
    if (req.url === '/') {
        res.write('Welcome to Node.js Web Server!');
    } else if (req.url === '/about') {
        res.write('This is About Page');
    } else {
        res.write('404 - Page Not Found');
    }
    
    res.end();
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
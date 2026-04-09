const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}! Welcome.`);
});

eventEmitter.on('greet', (name) => {
    console.log(`How are you, ${name}?`);
});

eventEmitter.on('dataReceived', (data) => {
    console.log('Data received:', data);
});

eventEmitter.on('asyncEvent', () => {
    setTimeout(() => {
        console.log('Async event handled after 2 seconds');
    }, 2000);
});

console.log('Triggering greet event...');
eventEmitter.emit('greet', 'Adil');

console.log('\nTriggering dataReceived event...');
eventEmitter.emit('dataReceived', { id: 101, message: 'Hello Node.js' });

console.log('\nTriggering async event...');
eventEmitter.emit('asyncEvent');
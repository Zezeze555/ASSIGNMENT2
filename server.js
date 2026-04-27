// Import required modules
const express = require('express'); // Web framework for handling HTTP requests
const http = require('http'); // Built-in Node.js module to create the server
const { Server } = require('socket.io'); // Socket.io library for real-time, bi-directional communication
const path = require('path'); // Utility for working with file and directory paths

// Initialize the application
const app = express(); // Create an instance of an Express application
const server = http.createServer(app); // Wrap the Express app in an HTTP server to support WebSockets
const io = new Server(server); // Initialize Socket.io to run on top of the HTTP server

// Middleware: Serve static files (HTML, CSS, JS) from the 'public' folder
// This allows the browser to access files like index.html or client.js automatically
app.use(express.static(path.join(__dirname, 'public')));

// Global object to store active users, mapping socket IDs to usernames
let users = {};

// Event listener: Fires whenever a new browser tab/client connects to the server
io.on('connection', (socket) => {
    
    // Listen for 'new-user' event sent by the client when they enter their name
    socket.on('new-user', (username) => {
        users[socket.id] = username; // Store the username using the unique socket ID as the key
        
        // Requirement: Activity Notification (Join)
        // Broadcast a system message to all connected clients that someone joined
        io.emit('chat-message', { name: 'System', message: `${username} joined the chat` });
        
        // Requirement: List of Users
        // Send the updated list of all active usernames to all clients
        io.emit('user-list', Object.values(users));
    });

    // Requirement: Chat Messages
    // Listen for 'send-message' event from a client
    socket.on('send-message', (msg) => {
        // Broadcast the message object (sender name + text) back to EVERYONE
        io.emit('chat-message', { name: users[socket.id], message: msg });
    });

    // Requirement: Typing Indicator
    // Listen for 'typing' event when a user is typing in their input box
    socket.on('typing', () => {
        // Send 'user-typing' event to everyone EXCEPT the person who is typing
        socket.broadcast.emit('user-typing', users[socket.id]);
    });

    // Requirement: Activity Notification (Exit)
    // Handle the event when a user closes their tab or loses connection
    socket.on('disconnect', () => {
        if (users[socket.id]) { // Check if the user existed in our tracking object
            const name = users[socket.id];
            
            // Notify all other users that this person has left
            io.emit('chat-message', { name: 'System', message: `${name} left the chat` });
            
            delete users[socket.id]; // Remove the user from the active users object
            
            // Send the updated (shorter) user list to all remaining clients
            io.emit('user-list', Object.values(users));
        }
    });
});

// Define the port number (3000 is standard for local development)
const PORT = 3000;

// Start the server and listen for incoming traffic
server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
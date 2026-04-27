// Establish connection to the Socket.io server
const socket = io();

// Reference all necessary HTML elements by their unique IDs
const messageContainer = document.getElementById('message-container');
const input = document.getElementById('msg-input');
const button = document.getElementById('send-btn');
const userList = document.getElementById('user-list');
const typingIndicator = document.getElementById('typing-indicator');

// Prompt the user for their name upon entering the page
// Requirement: Section D - User identity for notifications
const username = prompt("Enter your name:");
socket.emit('new-user', username);

// Event listener for the Send button to handle outgoing messages
button.addEventListener('click', () => {
    const message = input.value;
    // Only send if the message contains actual text
    if (message.trim() !== '') {
        socket.emit('send-message', message);
        input.value = ''; // Clear the input field for the next message
    }
});

// Listener for incoming chat messages from the server
// Requirement: Section D - Chat messages display
socket.on('chat-message', (data) => {
    const div = document.createElement('div');
    // Sanitize and format the message display (Sender: Message)
    div.textContent = `${data.name}: ${data.message}`;
    messageContainer.appendChild(div);
    // Ensure the chat scrolls to show the latest message
    messageContainer.scrollTop = messageContainer.scrollHeight;
});

// Listener to sync the online user list sidebar
// Requirement: Section D - List of users
socket.on('user-list', (users) => {
    userList.innerHTML = ''; // Reset the list before updating
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });
});

// Logic to inform the server that the current user is typing
// Requirement: Section D - Typing indicator
input.addEventListener('input', () => {
    socket.emit('typing');
});

// Listener to display which other user is currently typing
socket.on('user-typing', (name) => {
    typingIndicator.textContent = `${name} is typing...`;
    // Remove the indicator after 1 second of silence
    setTimeout(() => typingIndicator.textContent = '', 1000);
});



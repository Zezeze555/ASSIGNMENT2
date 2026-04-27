# My Personal Website & Real-Time Chat

# 1. What is this project?
This project is a 3-page personal website that features a built-in chat room. It was created to show how to combine a traditional website with a modern, "real-time" application using Node.js.

# 2. Explanation of the Pages
- Home Page (index.html):** This is the welcome screen. It introduces me, my studies, and includes my profile picture.
- About Page (about.html):** This page goes into more detail about my professional interests (like AI and Web Development) and my personal hobbies (like hiking).
- Chat Page (chat.html):** This is the interactive part of the site. It allows multiple users to talk to each other at the same time.

# 3. How the Chat Works (Step-by-Step)
I used a technology called **Socket.io**. Here is how the data moves:

- Step 1: Connection:** When a user opens the chat page, the browser sends a "handshake" to the server. The server recognizes a new user is online.
- Step 2: Identification:** The app asks for the user's name. This name is sent to the server so everyone else knows who is talking.
-  Step 3: Sending Messages:** When you type a message and click "Send," that text travels to the server.
-  Step 4: Broadcasting:** The server receives that message and immediately "broadcasts" (shouts) it out to every other open browser window.
-  Step 5: Typing Indicator:** While you type, a signal is sent to the server. The server tells everyone else "[Name] is typing..." so the chat feels alive.

# 4. Why use Node.js?
Standard websites usually only send information when you refresh the page. I used **Node.js** because it allows for a "constant connection." This is why messages appear instantly without the user having to click "Refresh."

# 5. Instructions to Run the Project
1. Make sure you have **Node.js** installed on your computer.
2. Download this project folder.
3. Open your terminal or command prompt in this folder.
4. Type `npm install` to get the necessary libraries (Express and Socket.io).
5. Type `node server.js` to start the engine.
6. Open your browser and go to `http://localhost:3000`.

## 6. Project Structure
- `server.js`: The "Server-side" code. It manages the connections and sends messages to the right people.
- `public/`: The "Client-side" code. This is what the user sees in their browser.
- `.gitignore`: A special file that prevents unnecessary files (like node_modules) from being uploaded to GitHub.
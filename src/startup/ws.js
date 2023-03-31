const { WebSocketServer } = require('ws');
const http = require('http');
const { uuid } = require('uuidv4');

module.exports = function ws() {
    // Spinning the http server and the WebSocket server.
    const server = http.createServer();
    const wsServer = new WebSocketServer({ server });
    const port = 8000;
    server.listen(port, () => {
        console.log(`WebSocket server is running on port ${port}`);
    });

    const clients = {};

    // A new client connection request received
    wsServer.on('connection', function (connection) {
        // Generate a unique code for every user
        const userId = uuid();
        console.log(`Recieved a new connection.`);

        // Store the new connection and handle messages
        clients[userId] = connection;
        console.log(`${userId} connected.`);
    });

    // User disconnected
    // connection.on('close', () => handleDisconnect(userId));
}

// function broadcastMessage(json) {
//     // We are sending the current data to all connected active clients
//     const data = JSON.stringify(json);
//     for (let userId in clients) {
//         let client = clients[userId];
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(data);
//         }
//     };
// }

function handleDisconnect(userId) {
    console.log(`${userId} disconnected.`);
    delete clients[userId];
}
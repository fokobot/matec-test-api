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

        connection.on('message', function (message) {
            console.log(message.toString());
            if (message.type === 'utf8') {
                console.log('Received Message: ', message.utf8Data);

                // broadcasting message to all connected clients
                for (let userId in clients) {
                    let client = clients[userId];
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(data);
                    }
                };
            }
        })

        // User disconnected
        connection.on('close', () => handleDisconnect(userId, clients));
    });


}

function handleDisconnect(userId, clients) {
    console.log(`${userId} disconnected.`);
    delete clients[userId];
}
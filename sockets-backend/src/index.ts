/* IMPLEMENTING WEB SOCKETS WITHOUT USING ANY FRAMEWORK */

import WebSocket, { WebSocketServer } from "ws"; // Import WebSocket and WebSocketServer from the "ws" module
import http from 'http'; // Import the built-in HTTP module

// Create an HTTP server that responds with "hi there" to any request
const server = http.createServer(function (request, response) {
    console.log((new Date()) + 'Received request for' + request.url); // Log the date and the requested URL
    response.end('hi there'); // End the response with a simple message
});

// Create a WebSocket server, passing the HTTP server as an option
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
    ws.on('error', console.error); // Log any errors that occur with the WebSocket connection

    // Listen for messages from the client
    ws.on('message', function message(data, isBinary) {
        // Broadcast the received message to all connected clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) { // Check if the client is still connected
                client.send(data, { binary: isBinary }); // Send the message to the client
            }
        });
    });

    ws.send('Hello! Message from server!!'); // Send a welcome message to the client when they connect
});

// Start the HTTP server on port 8080
server.listen(8080, function () {
    console.log((new Date()) + 'Server is listening on port 8080'); // Log the date and the server's listening status
});


// IMPLEMENTING WEB SOCKETS USING EXPRESS 
/*
import express from 'express'
import { WebSocketServer } from 'ws'

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});
*/
// FIXME: This is the entry point of the application, write your code here

import { calculateLayout } from "./utils";

import * as streams from "../utils/streams";
import { io } from "socket.io-client";

// Initialize the layout
calculateLayout();

// Create and config the socket
const socket = streams.initSocket();

socket.on("message", (msg) => { // Useful ?
    console.log(msg.result);
});

// Sends message to subscribe to a stream
streams.subscribe(socket);

// And directly disconnects bc why not
// streams.unsubscribe(socket);
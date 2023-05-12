// FIXME: This is the entry point of the application, write your code here

import { calculateLayout } from "./utils";

import * as streams from "../utils/streams";
import { connectStream } from "../utils/socket-communication";
import { displayCanvas, getCanvas, getConfig } from "../utils/api-communication";

// Initialize the layout
calculateLayout();

// Create and config the socket
const socket = streams.initSocket();

// Asks for connexion and waits for server response
await connectStream(socket);

// Get configuration
const config = (await getConfig())["data"];
displayCanvas(config);
console.log("Config: ", config);

// Display right room information
document.getElementById("room-name").innerHTML = config["metadata"]["name"];

let description = document.getElementById("room-description");
description.innerHTML = config["metadata"]["description"];
description.style.display = (config["metadata"]["description"] !== null) ? "inline" : "null";

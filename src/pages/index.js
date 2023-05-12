// FIXME: This is the entry point of the application, write your code here

import { fetchRoomConfig, joinRoom } from "../rooms";
import { displayCanvas } from "../rooms/canvas";
import { initSocket } from "../utils/streams";
import { calculateLayout } from "./utils";

// Initialize the layout
calculateLayout();

// Create and config the socket
const socket = initSocket();

// Asks for connexion and waits for server response
await joinRoom(socket, "epi-place");

// Get configuration
const config = (await fetchRoomConfig())["data"];
displayCanvas(config);
console.log("Config: ", config);

// Display right room information
document.getElementById("room-name").innerHTML = config["metadata"]["name"];

let description = document.getElementById("room-description");
description.innerHTML = config["metadata"]["description"];
description.style.display = (config["metadata"]["description"] !== null) ? "inline" : "null";

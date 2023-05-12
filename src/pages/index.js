// FIXME: This is the entry point of the application, write your code here

import { calculateLayout } from "./utils";

import * as streams from "../utils/streams";
import { connectStream } from "../utils/socket-communication";
import { getCanvas, getConfig } from "../utils/api-communication";
import { decodePixels } from "../utils/conversion";
import { initCanvas } from "../rooms/canvas/utils"

// Initialize the layout
calculateLayout();

// Create and config the socket
const socket = streams.initSocket();

// Asks for connexion and waits for server response
await connectStream(socket);

// Get configuration
const config = (await getConfig())["data"];
console.log("Config: ", config);

// Get canvas
const canvas = (await getCanvas())["data"]["pixels"];
let pixels = decodePixels(canvas);
initCanvas(config, pixels);
console.log("Canvas: ", canvas);
console.log(pixels);

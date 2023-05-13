// FIXME: This is the entry point of the application, write your code here

import axios from "axios";
import { fetchRoomConfig, joinRoom } from "../rooms";
import { displayCanvas, updatePixelInfo } from "../rooms/canvas";
import { transformPixelInfo } from "../rooms/canvas/conversion";
import { renderCanvasUpdate } from "../rooms/canvas/utils";
import { initSocket } from "../utils/streams";
import { calculateLayout } from "./utils";

// Initialize the layout
calculateLayout();

// Create and config the socket
const socket = initSocket();

// Asks for connexion and waits for server response
const earlyPixels = await joinRoom(socket, "epi-place");

// Get configuration
let config = (await fetchRoomConfig())["data"];
console.log("Config: ", config);

await displayCanvas();
for (const earlyPixel of earlyPixels) { // haha it doesn't work (maybe the problem is in joinRoom())
    console.log("I'm in the loop");
    updatePixelInfo(await transformPixelInfo(earlyPixel["timestamp"], earlyPixel["placedByUid"]));
}

// Display right room information
document.getElementById("room-name").innerHTML = config["metadata"]["name"];

let description = document.getElementById("room-description");
description.innerHTML = config["metadata"]["description"];
description.style.display = (config["metadata"]["description"] !== null) ? "inline" : "null";

// On load ?
socket.on("pixel-update", async (data) => {
    console.log("I received a pixel update");

    const pixelInfo = data["result"]["data"]["json"];
    console.log("PixelInfo: ", pixelInfo);
    // updatePixelInfo(await transformPixelInfo(pixelInfo["timestamp"], pixelInfo["placedByUid"]));
    renderCanvasUpdate(pixelInfo["color"].toString(), pixelInfo["posX"], pixelInfo["posY"]);
})
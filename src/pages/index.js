// FIXME: This is the entry point of the application, write your code here

import axios from "axios";
import { fetchRoomConfig } from "../rooms";
import { displayCanvas, updatePixelInfo } from "../rooms/canvas";
import { transformPixelInfo } from "../rooms/canvas/conversion";
import { renderCanvasUpdate } from "../rooms/canvas/utils";
import { initSocket, subscribe } from "../utils/streams";
import { calculateLayout } from "./utils";

// Initialize the layout
calculateLayout();

// Create and config the socket
const socket = initSocket();
subscribe(socket, "epi-place");

let earlyPixels = [];
let isInitialized = false;

// Asks for connexion and waits for server response
// const earlyPixels = await joinRoom(socket, "epi-place");

socket.on("message", (msg) => {
    if (msg["result"]["type"] === "started") {
        commAPI();
    }
});

socket.on("pixel-update", (data) => {
    if (!isInitialized) {
        earlyPixels.push(data["result"]["data"]["json"]);
    }

    else {
        console.log(data);
        const pixelInfo = data["result"]["data"]["json"];
        console.log("PixelInfo: ", pixelInfo);
        renderCanvasUpdate(pixelInfo["color"], pixelInfo["posX"], pixelInfo["posY"]);
    }
});

async function commAPI() {
    // Get configuration
    let config = (await fetchRoomConfig())["data"];

    await displayCanvas();
    isInitialized = true;

    for (const earlyPixel of earlyPixels) { // haha it doesn't work (maybe the problem is in joinRoom())
        console.log("I'm in the loop");
        updatePixelInfo(await transformPixelInfo(earlyPixel["timestamp"], earlyPixel["placedByUid"]));
    }

    // Display right room information
    document.getElementById("room-name").innerHTML = config["metadata"]["name"];

    let description = document.getElementById("room-description");
    description.innerHTML = config["metadata"]["description"];
    description.style.display = (config["metadata"]["description"] !== null) ? "inline" : "null";
}


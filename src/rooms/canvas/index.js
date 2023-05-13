// FIXME: This file should handle the room canvas API
// Link buttons to their respective functions
// Functions may include:
// - getCanvas (get the canvas of a room and deserialize it) (DONE)
// - getPixelInfo (get the pixel info of a room)
// - placePixel (place a pixel in a room)

import axios from "axios";
import { fetchRoomConfig } from "..";
import { groupByFive, transformPixelInfo, uniToBin } from "./conversion";
import { initCanvas, renderCanvasUpdate } from "./utils";

// Takes string of unicode
// Return array of pixels
export function getCanvas(str) {
    const binStr = uniToBin(str);
    return groupByFive(binStr);
}

export async function getRawCanvas() {
    // return await axios.get(`${import.meta.env.VITE_URL}/api/rooms/epi-place/config`);

    return await axios.get(`${import.meta.env.VITE_URL}/api/rooms/epi-place/canvas`);
}

export async function displayCanvas() {
    // Get config
    let config = (await fetchRoomConfig())["data"];

    // Get canvas
    const canvas = (await getRawCanvas())["data"]["pixels"];

    // Get decoded pixels
    let pixels = getCanvas(canvas);

    // Display the canvas
    initCanvas(config, pixels);
}

export async function getPixelInfo(posX, posY) {
    const info = (await axios.get(`${import.meta.env.VITE_URL}/api/rooms/epi-place/canvas/pixels`, {
        params: {
            posX: posX,
            posY: posY
        }
    }))["data"];
    console.log("Info: ", info);

    return await transformPixelInfo(info["timestamp"], info["placedByUid"]);
}

export async function updatePixelInfo(info) {
    console.log("Pixel Info: ", info);

    document.getElementById("tooltip-date").innerHTML = info["date"];
    document.getElementById("tooltip-time").innerHTML = info["time"];
    document.getElementById("tooltip-info-avatar").src = info["student"]["avatar"];
    document.getElementById("tooltip-info-login").innerHTML = info["student"]["login"];
    document.getElementById("tooltip-info-quote").innerHTML = info["student"]["quote"];
}

function displayCountdown(reset) {
    // Get the button object
    const placeButton = document.getElementById("color-place-button");

    placeButton.disabled = true;
    let remaining = Math.ceil(parseInt(reset));

    for (let i = 0; i <= remaining; i++) {
        const countDown = setTimeout(() => {
            const minutes = Math.floor((remaining - i) / 60);
            const seconds = (remaining - i) - minutes * 60;

            placeButton.innerHTML = `${minutes}:${(seconds < 10) ? "0" : ""}${seconds}`;

            if (i === remaining) {
                clearTimeout(countDown);
                placeButton.innerHTML = "PLACE";
                placeButton.disabled = false;
            }
        }, i * 1000);
    }
}

export async function placePixel(pos, color) {
    // Get pixel information
    const pixelInfo = await axios.post(`${import.meta.env.VITE_URL}/api/rooms/epi-place/canvas/pixels`, {
        posX: pos["x"],
        posY: pos["y"],
        color: color
    });

    // If we cannot make anymore request
    if (parseInt(pixelInfo.headers["x-ratelimit-remaining"]) === 0) {
        displayCountdown(pixelInfo.headers["x-ratelimit-reset"]);
    }
}
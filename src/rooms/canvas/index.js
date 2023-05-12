// FIXME: This file should handle the room canvas API
// Link buttons to their respective functions
// Functions may include:
// - getCanvas (get the canvas of a room and deserialize it) (DONE)
// - getPixelInfo (get the pixel info of a room)
// - placePixel (place a pixel in a room)

import axios from "axios";
import { groupByFive, uniToBin } from "./conversion";
import { initCanvas } from "./utils";

// Takes string of unicode
// Return array of pixels
export function getCanvas(str) {
    const binStr = uniToBin(str);
    return groupByFive(binStr);
}

export async function getRawCanvas() {
    return await axios.get(`${import.meta.env.VITE_URL}/api/rooms/epi-place/canvas`);
}

export async function displayCanvas(config) {
    // Get canvas
    const canvas = (await getRawCanvas())["data"]["pixels"];

    // Get decoded pixels
    let pixels = getCanvas(canvas);

    // Display the canvas
    initCanvas(config, pixels);
}

export async function getPixelInfo(posX, posY) {
    const info = await axios.get(`${import.meta.env.VITE_URL}/api/rooms/epi-place/canvas/pixels`, {
        params: {
            posX: posX,
            posY: posY
        }
    });

    return info;
}
import axios from "axios";

import { initCanvas } from "../rooms/canvas/utils";
import { decodePixels } from "../utils/conversion";

export async function getConfig() {
    return await axios.get(`${import.meta.env.VITE_URL}/api/rooms/epi-place/config`);
}

export async function getCanvas() {
    return await axios.get(`${import.meta.env.VITE_URL}/api/rooms/epi-place/canvas`);
}

export async function displayCanvas(config) {
    // Get canvas
    const canvas = (await getCanvas())["data"]["pixels"];

    // Get decoded pixels
    let pixels = decodePixels(canvas);

    // Display the canvas
    initCanvas(config, pixels);
} 
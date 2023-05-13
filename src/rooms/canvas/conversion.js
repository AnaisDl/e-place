import axios from "axios";

function decToBin(nb) { // Take decimal nb and turn it to binary str
    return nb.toString(2).padStart(8, "0");
}

export function uniToBin(str) { // Take unicode string and convert to binary str
    let bin = "";
    for (let i = 0; i < str.length; i++) {
        bin += decToBin(str.charCodeAt(i));
    }

    return bin;
}

// Takes binary string
// Return 
export function groupByFive(str) {
    let pixels = [];
    while (str.length >= 5) {
        const pixel = str.substring(0, 5);
        pixels.push(parseInt(pixel, 2));
        str = str.substring(5, str.length);
    }

    return pixels;
}

export async function transformPixelInfo(timestamp, uid) {
    console.log("UID: ", uid, ", of type: ", typeof uid);
    const date = new Date(timestamp).toLocaleDateString();
    const time = new Date(timestamp).toLocaleTimeString();

    const studentInfo = (await axios.get(`${import.meta.env.VITE_URL}/api/students/${uid}`))["data"];
    console.log("Student info: ", studentInfo);

    return {date: date, time: time, student: {
        avatar: studentInfo["avatarURL"],
        login: studentInfo["login"],
        quote: studentInfo["quote"]
    }};
}
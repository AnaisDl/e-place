function decToBin(nb) { // Take decimal nb and turn it to binary str
    return nb.toString(2).padStart(8, "0");
}

function binToDec(str) { // Take binary str and turn it to decimal nb
    let dec = 0;
    let len = str.length;
    for (let i = 0; i < len; i++) {
        dec += parseInt(str.charAt(i)) * 2 ** (len - i);
    }

    return dec;
}

function uniToBin(str) { // Take unicode string and convert to binary str
    let bin = "";
    for (let i = 0; i < str.length; i++) {
        bin += decToBin(str.charCodeAt(i));
    }

    return bin;
}

// Takes binary string
// Return 
function groupByFive(str) {
    let pixels = [];
    while (str.length >= 5) {
        const pixel = str.substring(0, 5);
        pixels.push(parseInt(pixel, 2));
        str = str.substring(5, str.length);
    }

    return pixels;
}

// Takes string of unicode
// Return array of pixels
export function decodePixels(str) {
    const binStr = uniToBin(str);
    return groupByFive(binStr);
}
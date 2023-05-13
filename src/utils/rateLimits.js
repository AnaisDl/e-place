// FIXME: This file should handle the rate limits
// Functions may include:
// - displayTimer (util function to display the timer for the rate limit)

export function displayTimer(reset) {
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
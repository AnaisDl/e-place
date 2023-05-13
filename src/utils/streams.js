// FIXME: This file should handle the sockets and the subscriptions
// Functions may include:
// - initSocket (initialize the connection to the socket server)
// - subscribe (subscribe to a room's stream or chat)
// - unsubscribe (unsubscribe from a room's stream or chat)
// - sendMessage (send a message to a room's chat)

import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

let myuuid = uuidv4();

export function initSocket() {
    console.log("Entered initSocket()")
    return io(`${import.meta.env.VITE_URL}`);
}

export async function subscribe(socket, slug) {
    const message = {
        'id': myuuid,
        'method': 'subscription',
        'params': {
            "path": "rooms.canvas.getStream",
            "input": {
                "json": {
                    "roomSlug": slug
                }
            }
        }
    };

    await socket.emit("message", message);
}

export function unsubscribe(socket) {
    const message = {
        'id': myuuid,
        'method': 'subscription.stop',
    };

    socket.emit("message", message);
}

export function sendMessage(msg) {
    // TODO (step 3)
}
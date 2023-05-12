import { subscribe } from "./streams";

export async function connectStream(socket) {
    return new Promise((resolve, reject) => {
        subscribe(socket);

        socket.on("message", (msg) => {
            console.log(msg.data);
            resolve();
        });
    });
}
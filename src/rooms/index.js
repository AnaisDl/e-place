// FIXME: This file should handle the rooms API
// Functions may include:
// - fetchRoomConfig (get the configuration of a room) DONE
// - joinRoom (join a room by its slug) (DONE)
// - listRooms (list all the rooms available)
// - createRoom (create a room)
// - updateRoom (update a room's configuration)
// - deleteRoom (delete a room)

import axios from "axios";
import { subscribe } from "../utils/streams";

export async function fetchRoomConfig() {
    return await axios.get(`${import.meta.env.VITE_URL}/api/rooms/epi-place/config`);
}

export async function joinRoom(socket, slug) {
    return new Promise((resolve, reject) => {
        subscribe(socket, slug);

        socket.on("message", (msg) => {
            console.log(msg.data);
            resolve();
        });
    });
}
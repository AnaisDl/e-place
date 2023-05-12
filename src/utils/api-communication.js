import axios from "axios";

export async function getConfig() {
    return await axios.get(`${import.meta.env.VITE_URL}/api/rooms/epi-place/config`);
}
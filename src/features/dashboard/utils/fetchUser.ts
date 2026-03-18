import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchUser = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/api/v1/auth/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("[fetchUser] error:", error);
    }
}
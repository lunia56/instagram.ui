import axios from "axios";

export const instagramInstance = axios.create({
    baseURL: "https://instagram-api-jq7e.onrender.com/api/",
    withCredentials: true
});

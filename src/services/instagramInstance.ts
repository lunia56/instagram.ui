import axios from "axios";

export const instagramInstance = axios.create({
    baseURL: "https://inctagram-api.onrender.com/api/",
});

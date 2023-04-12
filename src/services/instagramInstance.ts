import axios from "axios";

export const instagramInstance = axios.create({
    baseURL: "https://instagram-api-psi.vercel.app/",

});

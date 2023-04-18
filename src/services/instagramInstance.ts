import axios from "axios";

export const instagramInstance = axios.create({
    baseURL: "https://instagramapi-production.up.railway.app/ ",

});

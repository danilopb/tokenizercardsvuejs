import { ApiContract } from "../../Domain/Contracts/ApiContract";
import axios from "axios";
import ConfigService from "./ConfigService";
export class AxiosApi implements ApiContract {
    constructor() {
        axios.defaults.baseURL = ConfigService.getConfig().baseApiUrl;
        const apiToken = localStorage.getItem("api_token");
        console.log(apiToken);
        // const api_token = document.head.querySelector('meta[name="api-token"]');
        if (apiToken) {
            axios.defaults.headers.common["Authorization"] = apiToken;
        } else {
            console.warn("Api token not found");
        }
    }

    async get(url: string, params?: object): Promise<any> {
        // console.log("Axios GEt");
        return await axios.get(url, { params: params }).catch((error) => {
            console.error("ERROR:", error);
            throw error;
        });
    }

    async post(url: string, params: object): Promise<any> {
        // console.log("Axios POST");
        return await axios.post(url, params).catch((error) => {
            console.error("ERROR:", error);
            throw error;
        });
    }
}

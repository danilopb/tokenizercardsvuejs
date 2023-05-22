import ConfigContract from "../Domain/Contracts/ConfigContract";

export default class AppConfig implements ConfigContract {
    baseApiUrl: string;

    constructor() {
        this.baseApiUrl = process.env.VUE_APP_BASE_API_URL || "/";
    }
}

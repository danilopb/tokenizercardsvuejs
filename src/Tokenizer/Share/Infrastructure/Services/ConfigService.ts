import AppConfig from "../AppConfig";

class ConfigService {
    private static instance: ConfigService;
    private readonly config: AppConfig;

    private constructor() {
        this.config = new AppConfig();
    }

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }

    public getConfig(): AppConfig {
        return this.config;
    }
}

export default ConfigService.getInstance();

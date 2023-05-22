import { ApiContract } from "@/Tokenizer/Share/Domain/Contracts/ApiContract";
import { AuthRepositoryContract } from "../../Domain/Contracts/AuthRepositoryContract";
import { AuthUsername } from "../../Domain/ValueObjects/AuthUsername";
import { AuthPassword } from "../../Domain/ValueObjects/AuthPassword";
import { AxiosApi } from "@/Tokenizer/Share/Infrastructure/Services/AxiosApi";
import { AuthApiToken } from "../../Domain/ValueObjects/AuthApiToken";

export class AuthRepository implements AuthRepositoryContract {
    private apiService: ApiContract;
    private endPoint: string;
    constructor() {
        this.apiService = new AxiosApi();
        this.endPoint = "";
    }

    async login(username: AuthUsername, password: AuthPassword): Promise<AuthApiToken> {
        const formData = new FormData();
        formData.append("username", username.getValue());
        formData.append("password", password.getValue());
        return await this.apiService
            .post(`${this.endPoint}/login`, formData)
            .then((response) => {
                return new AuthApiToken(response?.data?.api_token);
            })
            .catch((error) => {
                throw error;
            });
    }
}

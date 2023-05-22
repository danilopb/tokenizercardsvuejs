import { AuthRepositoryContract } from "../../Domain/Contracts/AuthRepositoryContract";
import { AuthApiToken } from "../../Domain/ValueObjects/AuthApiToken";
import { AuthUsername } from "../../Domain/ValueObjects/AuthUsername";
import { AuthPassword } from "../../Domain/ValueObjects/AuthPassword";

export class LoginUseCase {
    private repository: AuthRepositoryContract;
    constructor(repository: AuthRepositoryContract) {
        this.repository = repository;
    }

    async execute(username: string, password: string): Promise<AuthApiToken> {
        return await this.repository.login(new AuthUsername(username), new AuthPassword(password));
    }
}

import { AuthApiToken } from "../ValueObjects/AuthApiToken";
import { AuthUsername } from "../ValueObjects/AuthUsername";
import { AuthPassword } from "../ValueObjects/AuthPassword";

export interface AuthRepositoryContract {
    // eslint-disable-next-line no-unused-vars
    login(username: AuthUsername, password: AuthPassword): Promise<AuthApiToken>;
}

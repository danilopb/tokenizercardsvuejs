import { AuthApiToken } from "@/Tokenizer/auth/Domain/ValueObjects/AuthApiToken";
import { AuthPassword } from "@/Tokenizer/auth/Domain/ValueObjects/AuthPassword";
import { AuthUsername } from "@/Tokenizer/auth/Domain/ValueObjects/AuthUsername";
import { LoginUseCase } from "@/Tokenizer/auth/application/auth/LoginUseCase";

describe("LoginUseCase_class", () => {
    it("test_successful_login", async () => {
        const mockToken = new AuthApiToken("valid_token");
        const mockRepository = {
            login: jest.fn().mockResolvedValue(mockToken)
        };
        const useCase = new LoginUseCase(mockRepository);
        const result = await useCase.execute("valid_username", "valid_password");
        expect(result).toEqual(mockToken);
        expect(mockRepository.login).toHaveBeenCalledWith(
            new AuthUsername("valid_username"),
            new AuthPassword("valid_password")
        );
    });

    it("test_invalid_password", async () => {
        const mockRepository = {
            login: jest.fn().mockRejectedValue(new Error("Invalid password"))
        };
        const useCase = new LoginUseCase(mockRepository);
        await expect(useCase.execute("valid_username", "invalid_password")).rejects.toThrowError("Invalid password");
        expect(mockRepository.login).toHaveBeenCalledWith(
            new AuthUsername("valid_username"),
            new AuthPassword("invalid_password")
        );
    });
});

import CardFindByTokenUseCase from "@/Tokenizer/card/application/CardFindByTokenUseCase";
import CardEntity from "@/Tokenizer/card/domain/CardEntity";
import CardRepositoryContract from "@/Tokenizer/card/domain/Contracts/CardRepositoryContract";
import CardToken from "@/Tokenizer/card/domain/ValueObjects/CardToken";

describe("CardFindByTokenUseCase_class", () => {
    it("test_happy_path_execute", async () => {
        const mockRepository: CardRepositoryContract = {
            findByToken: jest.fn().mockResolvedValue(new CardEntity(CardEntity.builder())),
            tokenization: jest.fn().mockResolvedValue(new CardEntity(CardEntity.builder()))
        };
        const useCase = new CardFindByTokenUseCase(mockRepository);
        const result = await useCase.execute("valid_token");

        expect(result).toBeInstanceOf(CardEntity);
        expect(mockRepository.findByToken).toHaveBeenCalledWith(new CardToken("valid_token"));
    });
});

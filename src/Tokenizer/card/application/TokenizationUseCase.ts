import CardRepositoryContract from "../domain/Contracts/CardRepositoryContract";
import CardCvv from "../domain/ValueObjects/CardCvv";
import CardEmail from "../domain/ValueObjects/CardEmail";
import CardExpirationMonth from "../domain/ValueObjects/CardExpirationMonth";
import CardExpirationYear from "../domain/ValueObjects/CardExpirationYear";
import CardNumber from "../domain/ValueObjects/CardNumber";
import CardEntity from "../domain/CardEntity";

export class TokenizationUseCase {
    private repository: CardRepositoryContract;
    constructor(repository: CardRepositoryContract) {
        this.repository = repository;
    }

    async execute(
        cardNumber: string,
        cvv: string,
        expirationMonth: string,
        expirationYear: string,
        email: string
    ): Promise<CardEntity> {
        return await this.repository.tokenization(
            new CardNumber(Number(cardNumber)),
            new CardCvv(Number(cvv)),
            new CardExpirationMonth(expirationMonth),
            new CardExpirationYear(expirationYear),
            new CardEmail(email)
        );
    }
}

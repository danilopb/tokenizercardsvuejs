import { ApiContract } from "@/Tokenizer/Share/Domain/Contracts/ApiContract";
import { AxiosApi } from "@/Tokenizer/Share/Infrastructure/Services/AxiosApi";
import CardNumber from "../domain/ValueObjects/CardNumber";
import CardCvv from "../domain/ValueObjects/CardCvv";
import CardExpirationMonth from "../domain/ValueObjects/CardExpirationMonth";
import CardExpirationYear from "../domain/ValueObjects/CardExpirationYear";
import CardEmail from "../domain/ValueObjects/CardEmail";
import CardRepositoryContract from "../domain/Contracts/CardRepositoryContract";
import CardContract from "../domain/Contracts/CardContract";
import CardEntity from "../domain/CardEntity";
import CardToken from "../domain/ValueObjects/CardToken";
import CardExpirationToken from "../domain/ValueObjects/CardExpirationToken";
import CardHiddenNumber from "../domain/ValueObjects/CardHiddenNumber";

export class CardRepository implements CardRepositoryContract {
    private apiService: ApiContract;
    private endPoint: string;
    constructor() {
        this.apiService = new AxiosApi();
        this.endPoint = "/cards";
    }

    async findByToken(token: CardToken): Promise<CardContract> {
        return await this.apiService
            .get(`${this.endPoint}/find/${token.getValue()}`)
            .then((response) => {
                const card = response.data.card;
                return CardEntity.builder()
                    .withNumber(new CardNumber(card.number))
                    .withHiddenNumber(new CardHiddenNumber(card.number_hidden))
                    .withCvv(new CardCvv(card.cvv))
                    .withExpirationMonth(new CardExpirationMonth(card.expiration_month))
                    .withExpirationYear(new CardExpirationMonth(card.expiration_year))
                    .withToken(new CardToken(card.token))
                    .withExpirationToken(new CardExpirationToken(card.expiration_token))
                    .withEmail(new CardEmail(card.email))
                    .build();
            })
            .catch((error) => {
                throw error;
            });
    }

    async tokenization(
        number: CardNumber,
        cvv: CardCvv,
        expirationMonth: CardExpirationMonth,
        expirationYear: CardExpirationYear,
        email: CardEmail
    ): Promise<CardContract> {
        const formData = new FormData();
        formData.append("card_number", number.getValue().toString());
        formData.append("cvv", cvv.getValue().toString());
        formData.append("expiration_month", expirationMonth.getValue());
        formData.append("expiration_year", expirationYear.getValue());
        formData.append("email", email.getValue());
        return await this.apiService
            .post(`${this.endPoint}/generate-token`, formData)
            .then((response) => {
                const card = response.data.card;
                return CardEntity.builder()
                    .withToken(new CardToken(card.token))
                    .withExpirationToken(new CardExpirationToken(card.expiration_token))
                    .build();
            })
            .catch((error) => {
                throw error;
            });
    }
}

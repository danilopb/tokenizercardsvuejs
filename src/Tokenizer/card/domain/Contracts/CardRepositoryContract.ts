import CardNumber from "@/Tokenizer/card/domain/ValueObjects/CardNumber";
import CardCvv from "@/Tokenizer/card/domain/ValueObjects/CardCvv";
import CardExpirationMonth from "@/Tokenizer/card/domain/ValueObjects/CardExpirationMonth";
import CardExpirationYear from "@/Tokenizer/card/domain/ValueObjects/CardExpirationYear";
import CardEmail from "@/Tokenizer/card/domain/ValueObjects/CardEmail";
import CardContract from "./CardContract";
import CardToken from "../ValueObjects/CardToken";

export default interface CardRepositoryContract {
    findByToken(token: CardToken): Promise<CardContract>;
    tokenization(
        number: CardNumber,
        cvv: CardCvv,
        expirationMonth: CardExpirationMonth,
        expirationYear: CardExpirationYear,
        email : CardEmail
    ): Promise<CardContract>;
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import CardBuilder from "./Builders/CardBuilder";
import CardContract from "./Contracts/CardContract";
import CardCvv from "./ValueObjects/CardCvv";
import CardEmail from "./ValueObjects/CardEmail";
import CardExpirationMonth from "./ValueObjects/CardExpirationMonth";
import CardExpirationToken from "./ValueObjects/CardExpirationToken";
import CardExpirationYear from "./ValueObjects/CardExpirationYear";
import CardHiddenNumber from "./ValueObjects/CardHiddenNumber";
import CardNumber from "./ValueObjects/CardNumber";
import CardToken from "./ValueObjects/CardToken";

export default class CardEntity implements CardContract {
    number: CardNumber;
    hiddenNumber: CardHiddenNumber;
    cvv: CardCvv;
    expirationMonth: CardExpirationMonth;
    expirationYear: CardExpirationYear;
    email: CardEmail;
    token: CardToken;
    expirationToken: CardExpirationToken;

    constructor(builder: CardBuilder) {
        this.number = builder.number!;
        this.hiddenNumber = builder.hiddenNumber!;
        this.cvv = builder.cvv!;
        this.expirationMonth = builder.expirationMonth!;
        this.expirationYear = builder.expirationYear!;
        this.email = builder.email!;
        this.token = builder.token!;
        this.expirationToken = builder.expirationToken!;
    }

    public static builder(): CardBuilder {
        return new CardBuilder();
    }
}

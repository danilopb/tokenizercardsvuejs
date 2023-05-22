import CardEntity from "../CardEntity";
import CardCvv from "../ValueObjects/CardCvv";
import CardEmail from "../ValueObjects/CardEmail";
import CardExpirationMonth from "../ValueObjects/CardExpirationMonth";
import CardExpirationToken from "../ValueObjects/CardExpirationToken";
import CardExpirationYear from "../ValueObjects/CardExpirationYear";
import CardHiddenNumber from "../ValueObjects/CardHiddenNumber";
import CardNumber from "../ValueObjects/CardNumber";
import CardToken from "../ValueObjects/CardToken";

export default class CardBuilder {
    number?: CardNumber;
    hiddenNumber?: CardHiddenNumber;
    cvv?: CardCvv;
    expirationMonth?: CardExpirationMonth;
    expirationYear?: CardExpirationYear;
    email?: CardEmail;
    token?: CardToken;
    expirationToken?: CardExpirationToken;

    public build(): CardEntity {
        return new CardEntity(this);
    }

    public withNumber(number: CardNumber): CardBuilder {
        this.number = number;
        return this;
    }

    public withHiddenNumber(hiddenNumber: CardHiddenNumber): CardBuilder {
        this.hiddenNumber = hiddenNumber;
        return this;
    }

    public withCvv(cvv: CardCvv): CardBuilder {
        this.cvv = cvv;
        return this;
    }

    public withExpirationMonth(expirationMonth: CardExpirationMonth): CardBuilder {
        this.expirationMonth = expirationMonth;
        return this;
    }

    public withExpirationYear(expirationYear: CardExpirationYear): CardBuilder {
        this.expirationYear = expirationYear;
        return this;
    }

    public withEmail(email: CardEmail): CardBuilder {
        this.email = email;
        return this;
    }

    public withToken(token: CardToken): CardBuilder {
        this.token = token;
        return this;
    }

    public withExpirationToken(expirationToken: CardExpirationToken): CardBuilder {
        this.expirationToken = expirationToken;
        return this;
    }
}

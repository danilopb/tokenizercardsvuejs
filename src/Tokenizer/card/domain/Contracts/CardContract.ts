import CardCvv from "../ValueObjects/CardCvv";
import CardEmail from "../ValueObjects/CardEmail";
import CardExpirationMonth from "../ValueObjects/CardExpirationMonth";
import CardExpirationToken from "../ValueObjects/CardExpirationToken";
import CardExpirationYear from "../ValueObjects/CardExpirationYear";
import CardHiddenNumber from "../ValueObjects/CardHiddenNumber";
import CardNumber from "../ValueObjects/CardNumber";
import CardToken from "../ValueObjects/CardToken";

export default interface CardContract {
    number: CardNumber;
    hiddenNumber: CardHiddenNumber;
    cvv: CardCvv;
    expirationMonth: CardExpirationMonth;
    expirationYear: CardExpirationYear;
    email: CardEmail;
    token: CardToken;
    expirationToken: CardExpirationToken;
}

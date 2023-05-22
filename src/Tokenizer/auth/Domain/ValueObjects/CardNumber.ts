import NumberValueObject from "@/Tokenizer/Share/Domain/ValueObject/NumberValueObject";

export default class CardNumber extends NumberValueObject {
    public getHiddenCard() {
        const card = this.value.toString();
        const cardLenght = card.length;
        const lastDigits = card.slice(-4);
        const asteriscos = "*".repeat(cardLenght - 4);
        return asteriscos + lastDigits;
    }
}

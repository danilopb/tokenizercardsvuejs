import DateHelper from "@/Tokenizer/Share/Domain/Helpers/DateHelper";

export default class CardExpirationToken {
    private readonly value: Date;

    constructor(value: Date) {
        this.value = value;
    }

    getValue(): Date {
        return this.value;
    }

    getDisplayValue(): string {
        return DateHelper.formatDate(this.value);
    }
}

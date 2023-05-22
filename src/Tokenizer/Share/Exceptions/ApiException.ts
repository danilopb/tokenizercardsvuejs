import CustomException from "./CustomException";

export default class ApiException extends CustomException {
    constructor(status: number, message: string) {
        super(status, message);
    }
}

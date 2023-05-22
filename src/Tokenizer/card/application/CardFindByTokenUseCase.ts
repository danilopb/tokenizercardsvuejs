import CardRepositoryContract from "../domain/Contracts/CardRepositoryContract";
import CardToken from "../domain/ValueObjects/CardToken";
import CardEntity from "../domain/CardEntity";

export default class CardFindByTokenUseCase {
    private repository: CardRepositoryContract;
    constructor(repository: CardRepositoryContract) {
        this.repository = repository;
    }

    async execute(token: string): Promise<CardEntity> {
        return await this.repository.findByToken(new CardToken(token));
    }
}

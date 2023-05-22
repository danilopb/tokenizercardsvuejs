export class UserAuthEntity {
    private _id: number;
    private _names: string;

    constructor(id: number, names: string) {
        this._id = id;
        this._names = names;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get names(): string {
        return this._names;
    }

    set names(names: string) {
        this._names = names;
    }
}

export interface ApiContract {
    // eslint-disable-next-line no-unused-vars
    get(url: string, params?: object): Promise<any>;
    // eslint-disable-next-line no-unused-vars
    post(url: string, params: object): Promise<any>;
}

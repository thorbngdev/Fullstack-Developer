export class ResponseApi {
    status: number;
    descricao: string;

    constructor(status: number, descricao: string) {
        this.status = status;
        this.descricao = descricao;
    }
}
export class Produto {

    id: string;
    codigo: string;
    nome: string;
    precoUnitario: number;
    imagemUrl: string;
    quantidade: number;

    constructor(id: string, codigo: string, nome: string, precoUnitario: number, imagemUrl: string, quantidade: number) {
        this.id = id;
        this.codigo = codigo;
        this.nome = nome;
        this.precoUnitario = precoUnitario;
        this.imagemUrl = imagemUrl;
        this.quantidade = quantidade;
    }
}
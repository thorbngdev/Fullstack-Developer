export class Produto {
    
    id: string;
    codigo: string;
    nome: string;
    precoUnitario: number;
    imagemUrl: string;

    constructor(id: string, codigo: string, nome: string, precoUnitario: number, imagemUrl: string) {
        this.id = id;
        this.codigo = codigo;
        this.nome = nome;
        this.precoUnitario = precoUnitario;
        this.imagemUrl = imagemUrl;
    }
}
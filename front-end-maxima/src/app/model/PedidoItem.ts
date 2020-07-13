export class PedidoItem {

    idItem: string;
    nomeItem: string;
    codigoItem: string;
    quantidade: number;
    valorUnitario: number;

    constructor(idItem: string,
        nomeItem: string,
        codigoItem: string,
        quantidade: number,
        valorUnitario: number) {
            this.idItem = idItem;
            this.nomeItem = nomeItem;
            this.codigoItem = codigoItem;
            this.quantidade = quantidade;
            this.valorUnitario = valorUnitario;
    }
}
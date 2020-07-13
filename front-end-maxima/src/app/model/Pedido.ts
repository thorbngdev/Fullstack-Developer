import { PedidoItem } from './PedidoItem';

export class Pedido {

    cdPedido: string;
    cliente: string;
    valorTotal: number;
    valorFrete: number;
    quantidade: number;
    dataPedido: string;
    pedidoItens: PedidoItem[];

    constructor( cdPedido: string,
        cliente: string,
        valorTotal: number,
        valorFrete: number,
        quantidade: number,
        dataPedido: string,
        pedidoItens: PedidoItem[]){
            this.cdPedido = cdPedido;
            this.cliente = cliente;
            this.valorTotal = valorTotal;
            this.valorFrete = valorFrete;
            this.quantidade = quantidade;
            this.dataPedido = dataPedido;
            this.pedidoItens = pedidoItens;
    }
}
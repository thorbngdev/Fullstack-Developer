import { Pedido } from './../model/Pedido';
import { Produto } from './../model/Produto';
import { ResponseApi } from '../model/ResponseApi';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';
import { NovoPedidoState } from './novo-pedido.state';
import { Injectable } from "@angular/core";
import { NovoPedidoApi } from './novo-pedido.api';

@Injectable()
export class NovoPedidoFacade {

    constructor(private novoPedidoState: NovoPedidoState, private novoPedidoApi: NovoPedidoApi){}

    setClienteSelecionado(cliente: Cliente) {
        this.novoPedidoState.setClienteSelecionado(cliente);
    }

    setProdutoSelecionado(produto: Produto) {
        this.novoPedidoState.setProdutoSelecionado(produto);
    }

    setProdutosEscolhidos(produtos: Produto[]) {
        this.novoPedidoState.setProdutosEscolhidos(produtos);
    }

    setPedidoFrete(quantidade: number) {
        this.novoPedidoApi.getFrete(quantidade).subscribe(frete => this.novoPedidoState.setPedidoFrete(frete));
    }

    carregarClientesConfigurados() {
        console.log('Populando lista de clientes...');
        this.novoPedidoApi.getClientes().subscribe(clientes => this.novoPedidoState.setClientesConfigurados(clientes));
    }

    carregarProdutosConfigurados() {
        console.log('Populando lista de produtos...');
        this.novoPedidoApi.getProdutos().subscribe(produtos => this.novoPedidoState.setProdutosConfigurados(produtos));
    }

    getClientesConfigurados(): Observable<Cliente[]> {
        return this.novoPedidoState.getClientesConfigurados();
    }

    getProdutosConfigurados(): Observable<Produto[]> {
        return this.novoPedidoState.getProdutosConfigurados();
    }
    
    getProdutosEscolhidos(): Observable<Produto[]> {
        return this.novoPedidoState.getProdutosEscolhidos();
    }

    getPedidoFrete(): Observable<number> {
        return this.novoPedidoState.getPedidoFrete();
    }

    getClienteSelecionado(): Observable<Cliente> {
        return this.novoPedidoState.getClienteSelecionado();
    }

    getResponseApiEnviarPedido(): Observable<ResponseApi> {
        return this.novoPedidoState.getResponseApiEnviarPedido();
    }

    enviarPedido(pedido: Pedido) {
        this.novoPedidoApi.postEnviarPedido(pedido).subscribe(response => {
            console.log('status ' + response.status);
            console.log('status text ' + response.statusText);
            let responseApi = new ResponseApi(response.status, response.statusText);
            this.novoPedidoState.setResponseApiEnviarPedido(responseApi);
        },
        error => {
            console.log('Erro ao enviar um pedido!')
            let responseApi = new ResponseApi(error.status, error.statusText);
            this.novoPedidoState.setResponseApiEnviarPedido(responseApi);
        });
    }

}
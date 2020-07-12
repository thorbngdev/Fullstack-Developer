import { Produto } from './model/Produto';
import { Observable } from 'rxjs';
import { Cliente } from './model/Cliente';
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

}
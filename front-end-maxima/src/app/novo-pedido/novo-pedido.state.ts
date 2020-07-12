import { Produto } from './model/Produto';
import { Cliente } from './model/Cliente';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NovoPedidoState {

    private clienteSelecionado = new BehaviorSubject<Cliente>(null);
    private clientesConfigurados = new BehaviorSubject<Cliente[]>(null);
    private produtoSelecionado = new BehaviorSubject<Produto>(null);
    private produtosConfigurados = new BehaviorSubject<Produto[]>(null);
    private produtosEscolhidos = new BehaviorSubject<Produto[]>(null);

    setClienteSelecionado(cliente: Cliente) {
        this.clienteSelecionado.next(cliente);
    }

    getClienteSelecionado() {
        return this.clienteSelecionado.asObservable();
    }

    setClientesConfigurados(clientes: Cliente[]) {
        this.clientesConfigurados.next(clientes);
    }

    getClientesConfigurados() {
        return this.clientesConfigurados.asObservable();
    }

    setProdutoSelecionado(produto: Produto) {
        this.produtoSelecionado.next(produto);
    }

    getProdutoSelecionado() {
        return this.produtoSelecionado.asObservable();
    }

    setProdutosConfigurados(produtos: Produto[]) {
        this.produtosConfigurados.next(produtos);
    }

    getProdutosConfigurados() {
        return this.produtosConfigurados.asObservable();
    }

    setProdutosEscolhidos(produtos: Produto[]) {
        this.produtosEscolhidos.next(produtos);
    }

    getProdutosEscolhidos() {
        return this.produtosEscolhidos.asObservable();
    }
}
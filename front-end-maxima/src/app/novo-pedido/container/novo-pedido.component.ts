import { Produto } from './../model/Produto';
import { Cliente } from './../model/Cliente';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NovoPedidoFacade } from '../novo-pedido.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.scss']
})
export class NovoPedidoComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('selectcliente') selectCliente: NgSelectComponent;
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;

  @ViewChild('selectproduto') selectProduto: NgSelectComponent;
  produtos: Produto[] = [];
  produtoSelecionado: Produto;

  produtosEscolhidos: Produto[] = [];
  novoPedidoCodigo: number = 12345678;

  subscricaoClientesConfigurados: Subscription;
  subscricaoProdutosConfigurados: Subscription;

  constructor(private novoPedidoFacade: NovoPedidoFacade) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.novoPedidoFacade.carregarClientesConfigurados();
    this.subscricaoClientesConfigurados = this.novoPedidoFacade.getClientesConfigurados().subscribe(clientes => {
      if (clientes != null) {
        this.popularListaClientes(clientes);
      }
    });

    this.novoPedidoFacade.carregarProdutosConfigurados();
    this.subscricaoProdutosConfigurados = this.novoPedidoFacade.getProdutosConfigurados().subscribe(produtos => {
      if (produtos != null) {
        this.popularListaProdutos(produtos);
      }
    });
  }

  popularListaClientes(clientes: Cliente[]) {
    this.clientes = clientes;
  }

  popularListaProdutos(produtos: Produto[]) {
    this.produtos = produtos;
  }

  popularListaProdutosEscolhidos(produtos: Produto[]) {
    this.produtosEscolhidos = produtos;
  }

  setClienteSelecionado(event: Cliente) {
    this.novoPedidoFacade.setClienteSelecionado(event);
  }

  setProdutoSelecionado(event: Produto) {
    this.novoPedidoFacade.setProdutoSelecionado(event);
  }

  carrinhoVazio() {
    return this.produtosEscolhidos.length == 0;
  }

  adicionarProduto(event: Produto) {
    this.produtosEscolhidos.push(event);
    this.novoPedidoFacade.setProdutosEscolhidos(this.produtosEscolhidos);
    console.log(this.produtosEscolhidos);
  }

  removerProduto(event: Produto) {
    this.produtosEscolhidos.splice(this.produtosEscolhidos.indexOf(event), 1);
    console.log(this.produtosEscolhidos);
  }

  ngOnDestroy() {
    this.subscricaoClientesConfigurados.unsubscribe();
    this.subscricaoProdutosConfigurados.unsubscribe();
  }
}
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
  pedidoFrete: number = 0;

  subscricaoClientesConfigurados: Subscription;
  subscricaoProdutosConfigurados: Subscription;
  subscricaoPedidoFrete: Subscription;

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

    this.subscricaoPedidoFrete = this.novoPedidoFacade.getPedidoFrete().subscribe(frete => {
      if (frete != null) {
        this.pedidoFrete = frete;
      }
    });

  }

  popularListaClientes(clientes: Cliente[]) {
    this.clientes = clientes;
  }

  popularListaProdutos(produtos: Produto[]) {
    this.produtos = produtos;
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
    event.quantidade = 1;
    this.produtosEscolhidos.push(event);
    this.novoPedidoFacade.setProdutosEscolhidos(this.produtosEscolhidos);
    this.atualizarValorFrete();
  }

  removerProduto(event: Produto) {
    this.produtosEscolhidos.splice(this.produtosEscolhidos.indexOf(event), 1);
    this.atualizarValorFrete();
  }

  formatarPreco(event: number) {
    return (event).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  ajustarPrecoTotal(produto: Produto, event: any) {
    let qtd: number = event.target.value;
    if (qtd > 0 && qtd < 100) {
      produto.quantidade = event.target.value;
      this.atualizarValorFrete();
    }
  }

  obterValorItens() {
    let valorItens: number = 0;
    for (let produto of this.produtosEscolhidos) {
      valorItens = Number(valorItens) + (Number(produto.precoUnitario) * Number(produto.quantidade));
    }
    return this.formatarPreco(valorItens);
  }

  obterValorFrete() {
    return this.formatarPreco(this.pedidoFrete);
  }

  obterValorTotal() {
    let valorItens: number = 0;
    for (let produto of this.produtosEscolhidos) {
      valorItens = Number(valorItens) + (Number(produto.precoUnitario) * Number(produto.quantidade));
    }
    valorItens = Number(valorItens) + Number(this.pedidoFrete);
    return this.formatarPreco(valorItens);
  }

  atualizarValorFrete() {
    let qtdTotal: number = 0;
    for(let produto of this.produtosEscolhidos) {
      qtdTotal = Number(qtdTotal) + Number(produto.quantidade);
    }
    this.novoPedidoFacade.setPedidoFrete(qtdTotal);
  }

  obterNomeAjustado(produto: Produto) {
    return produto.nome.slice(0, 50) + '...';
  }

  limparCarrinho() {
    this.produtosEscolhidos = [];
    this.pedidoFrete = 0;
  }

  finalizarPedido() {

  }

  ngOnDestroy() {
    this.subscricaoClientesConfigurados.unsubscribe();
    this.subscricaoProdutosConfigurados.unsubscribe();
    this.subscricaoPedidoFrete.unsubscribe();
  }
}

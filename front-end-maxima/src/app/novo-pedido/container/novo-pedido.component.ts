import { PedidoItem } from './../../model/PedidoItem';
import { Pedido } from './../../model/Pedido';
import { Produto } from './../../model/Produto';
import { debounceTime } from 'rxjs/operators';
import { Cliente } from '../../model/Cliente';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NovoPedidoFacade } from '../novo-pedido.facade';
import { Subscription, Subject } from 'rxjs';
import { FormArray } from '@angular/forms';

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
  pedidoFrete: number = 0;

  private _toast = new Subject<string>();
  toast: string = '';

  subscricaoClientesConfigurados: Subscription;
  subscricaoProdutosConfigurados: Subscription;
  subscricaoClienteSelecionado: Subscription;
  subscricaoResponseApiEnviarPedido: Subscription;
  subscricaoPedidoFrete: Subscription;

  /**
   * Código de pedido aleatório
   */
  novoPedidoCodigo: number = Math.floor(Math.random() * (999999 - 100000)) + 100000;

  constructor(private novoPedidoFacade: NovoPedidoFacade) { }

  ngOnInit(): void {
    this._toast.subscribe((resposta) => this.toast = resposta);
    this._toast.pipe(debounceTime(2500)).subscribe(() => this.toast = '');
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

    this.subscricaoClienteSelecionado = this.novoPedidoFacade.getClienteSelecionado().subscribe(cliente => {
      if (cliente != null) {
        this.clienteSelecionado = cliente;
      }
    });

    this.subscricaoResponseApiEnviarPedido = this.novoPedidoFacade.getResponseApiEnviarPedido().subscribe(responseApi => {
      if (responseApi != null) {
        if (responseApi.status == 200) {
          this.salvarToastHandler('sucesso');
        } else {
          this.salvarToastHandler('erro');
        }
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
    for (let produto of this.produtosEscolhidos) {
      qtdTotal = Number(qtdTotal) + Number(produto.quantidade);
    }
    this.novoPedidoFacade.setPedidoFrete(qtdTotal);
  }

  obterNomeAjustado(produto: Produto) {
    return produto.nome.slice(0, 50) + '...';
  }

  limparCarrinho() {
    this.produtosEscolhidos = [];
    this.clienteSelecionado = null;
    this.pedidoFrete = 0;
    this.selectProduto.clearModel();
    this.selectCliente.clearModel();
  }

  finalizarPedido() {
    /**
     * TODO 
     * VERIFICAR SE POSSUI ITEMS
     * VERIFICAR SE POSSUI CLIENTE
     * 
     */
    if (!this.carrinhoVazio() && this.clienteSelecionado != null) {
      let pedidoItens: PedidoItem[] = [];
      let quantidade: number = 0;
      let valorTotal: number = 0;
      for (let produtoEscolhido of this.produtosEscolhidos) {
        let pedidoItem = new PedidoItem(produtoEscolhido.id, produtoEscolhido.nome, produtoEscolhido.codigo, produtoEscolhido.quantidade, produtoEscolhido.precoUnitario);
        quantidade = Number(quantidade) + Number(produtoEscolhido.quantidade);
        valorTotal = Number(valorTotal) + (Number(produtoEscolhido.precoUnitario) * Number(produtoEscolhido.quantidade));
        pedidoItens.push(pedidoItem);
      }
      let pedido = new Pedido(this.novoPedidoCodigo.toString(), this.clienteSelecionado.nome, valorTotal, this.pedidoFrete, quantidade, null, pedidoItens);
      console.log(pedido);
      this.novoPedidoFacade.enviarPedido(pedido);
      this.novoPedidoCodigo = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      this.limparCarrinho();
    } else {
      console.log(this.clienteSelecionado);
      console.log(this.produtosEscolhidos);
      console.error('Carrinho vazio ou cliente não selecionado!');
      this.salvarToastHandler('erro');
    }
  }

  salvarToastHandler(value: string): void {
    this._toast.next(value);
  }

  ngOnDestroy() {
    this.subscricaoClientesConfigurados.unsubscribe();
    this.subscricaoProdutosConfigurados.unsubscribe();
    this.subscricaoClienteSelecionado.unsubscribe();
    this.subscricaoResponseApiEnviarPedido.unsubscribe();
    this.subscricaoPedidoFrete.unsubscribe();
  }
}

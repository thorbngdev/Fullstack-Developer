import { Subscription } from 'rxjs';
import { Pedido } from './../../model/Pedido';
import { ListarPedidoFacade } from './../listar-pedido.facade';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.scss']
})
export class ListarPedidoComponent implements OnInit, AfterViewInit, OnDestroy {

  pedidos: Pedido[] = [];

  private subscricaoPedidos: Subscription;

  constructor(private listarPedidoFacade: ListarPedidoFacade) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.listarPedidoFacade.carregarPedidos();
    this.subscricaoPedidos = this.listarPedidoFacade.getPedidos().subscribe(pedidos => {
      if (pedidos != null) {
        this.popularListaPedidos(pedidos);
      }
    });
  }

  popularListaPedidos(pedidos: Pedido[]) {
    this.pedidos = pedidos;
  }

  formatarPreco(event: number) {
    return (event).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  ngOnDestroy(): void {
    this.subscricaoPedidos.unsubscribe();
  }

}

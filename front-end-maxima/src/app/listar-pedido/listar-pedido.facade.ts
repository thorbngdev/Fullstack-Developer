import { Pedido } from './../model/Pedido';
import { Observable } from 'rxjs';
import { ListarPedidoState } from './listar-pedido.state';
import { ListarPedidoApi } from './listar-pedido.api';
import { Injectable } from "@angular/core";

@Injectable()
export class ListarPedidoFacade {

    constructor(private listarPedidoApi: ListarPedidoApi, private listarPedidoState: ListarPedidoState) {}

    carregarPedidos() {
        console.log('Populando lista de pedidos...');
        this.listarPedidoApi.getListaPedido().subscribe(pedidos => this.listarPedidoState.setPedidos(pedidos));
    }

    getPedidos(): Observable<Pedido[]>{
        return this.listarPedidoState.getPedidos();
    }

}
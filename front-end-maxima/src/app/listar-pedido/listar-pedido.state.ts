import { BehaviorSubject } from 'rxjs';
import { Pedido } from './../model/Pedido';
import { Injectable } from "@angular/core";

@Injectable()
export class ListarPedidoState {

    private pedidos = new BehaviorSubject<Pedido[]>(null);

    setPedidos(pedidos: Pedido[]) {
        this.pedidos.next(pedidos);
    }

    getPedidos() {
        return this.pedidos.asObservable();
    }
}
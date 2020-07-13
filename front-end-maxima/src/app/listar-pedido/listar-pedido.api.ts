import { Observable } from 'rxjs';
import { Pedido } from './../model/Pedido';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ListarPedidoApi {

    url: string = 'http://localhost:8080/api/';

    constructor(private client: HttpClient) { }

    getListaPedido(): Observable<Pedido[]> {
        return this.client.get<Array<Pedido>>(this.url + 'pedido');
    }

}
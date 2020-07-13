import { Pedido } from './../model/Pedido';
import { Produto } from './../model/Produto';

import { Cliente } from '../model/Cliente';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NovoPedidoApi {

    url: string = 'http://localhost:8080/api/';

    constructor(private client: HttpClient) { }

    getClientes(): Observable<Cliente[]> {
        return this.client.get<Array<Cliente>>(this.url + 'clientes');
    }

    getProdutos(): Observable<Produto[]> {
        return this.client.get<Array<Produto>>(this.url + 'produtos');
    }

    getFrete(quantidade: number): Observable<number> {
        return this.client.get<number>(this.url + 'frete?quantidade=' + quantidade);
    }

    postEnviarPedido(pedido: Pedido): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.client.post(this.url + 'pedido', pedido, { headers, observe: 'response' });
    }
}
import { Produto } from './model/Produto';
import { Cliente } from './model/Cliente';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    
//     url: string = 'http://localhost:8080/api/';

//   constructor(private client: HttpClient) { }

//   getListaDocumentos(): Observable<string[]> {
//     return this.client.get<Array<string>>(this.url + 'documentos');
//   }

//   postIdentificacao(identificacao: Identificacao): Observable<any> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.client.post(this.url + 'identificar', identificacao, { headers, observe: 'response' });
//   }
}
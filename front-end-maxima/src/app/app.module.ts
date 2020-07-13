import { ListarPedidoModule } from './listar-pedido/listar-pedido.module';
import { ListarPedidoComponent } from './listar-pedido/container/listar-pedido.component';
import { NovoPedidoModule } from './novo-pedido/novo-pedido.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacaoComponent } from './barra-navegacao/barra-navegacao.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NovoPedidoModule,
    HttpClientModule,
    ListarPedidoModule
  ],
  providers: [BarraNavegacaoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

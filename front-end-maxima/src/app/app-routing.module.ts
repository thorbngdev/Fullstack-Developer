import { NovoPedidoComponent } from './novo-pedido/container/novo-pedido.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarPedidoComponent } from './listar-pedido/container/listar-pedido.component';


const routes: Routes = [
  {path: "pedido/novo", component: NovoPedidoComponent},
  {path: "pedido/listar", component: ListarPedidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

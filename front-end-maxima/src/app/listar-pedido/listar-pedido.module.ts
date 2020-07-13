import { ListarPedidoApi } from './listar-pedido.api';
import { ListarPedidoFacade } from './listar-pedido.facade';
import { ListarPedidoComponent } from './container/listar-pedido.component';
import { BarraNavegacaoComponent } from './../barra-navegacao/barra-navegacao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListarPedidoState } from './listar-pedido.state';

@NgModule({
    declarations: [ListarPedidoComponent],
    imports: [
        CommonModule, FormsModule, NgSelectModule
    ],
    exports: [ListarPedidoComponent],
    providers: [ListarPedidoState, ListarPedidoFacade, ListarPedidoApi]
})
export class ListarPedidoModule {}
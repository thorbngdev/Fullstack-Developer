import { BarraNavegacaoComponent } from './../barra-navegacao/barra-navegacao.component';
import { NovoPedidoApi } from './novo-pedido.api';
import { NovoPedidoFacade } from './novo-pedido.facade';
import { NovoPedidoState } from './novo-pedido.state';
import { NovoPedidoComponent } from './container/novo-pedido.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [NovoPedidoComponent],
    imports: [
        CommonModule, FormsModule, NgSelectModule
    ],
    exports: [NovoPedidoComponent],
    providers: [NovoPedidoState, NovoPedidoFacade, NovoPedidoApi]
})
export class NovoPedidoModule {}
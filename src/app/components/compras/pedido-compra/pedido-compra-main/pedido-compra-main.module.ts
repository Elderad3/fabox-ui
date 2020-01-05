import { ErrorService } from './../../../../core/error-handler/errors.service';
import { LayoutModule } from 'src/app/layout/layout.module';

import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToolbarModule} from 'primeng/toolbar';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DialogModule} from 'primeng/dialog';


import { PedidoCompraMainRoutingModule } from './pedido-compra-main-routing.module';
import { PedidoCompraMainComponent } from './pedido-compra-main.component';
import { PedidoCompraService } from './../pedido-compra.service';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    
    ToolbarModule,
    TableModule,
    InputTextModule, 
    ButtonModule,
    InputTextareaModule,
    InputSwitchModule,
    DialogModule,
    

    SharedModule,
    LayoutModule,
    PedidoCompraMainRoutingModule,
  
  ],
  declarations: [PedidoCompraMainComponent],
  exports: [PedidoCompraMainComponent],
  providers: [PedidoCompraService,ErrorService]
})
export class PedidoCompraMainModule { }
 
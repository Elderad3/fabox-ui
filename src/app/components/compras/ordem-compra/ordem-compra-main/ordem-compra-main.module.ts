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


import { OrdemCompraMainRoutingModule } from './ordem-compra-main-routing.module';
import { OrdemCompraMainComponent } from './ordem-compra-main.component';
import { OrdemCompraService } from './../ordem-compra.service';
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
    OrdemCompraMainRoutingModule,
  
  ],
  declarations: [OrdemCompraMainComponent],
  exports: [OrdemCompraMainComponent],
  providers: [OrdemCompraService,ErrorService]
})
export class OrdemCompraMainModule { }
 
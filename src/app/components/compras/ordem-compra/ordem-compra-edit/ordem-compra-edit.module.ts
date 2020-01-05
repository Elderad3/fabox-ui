import { ProdutoService } from './../../../estoque/produto/produto.service';
import { ErrorService } from './../../../../core/error-handler/errors.service';
import { FormMessageService } from './../../../../shared/mensagens/form-message.service';
import { LayoutModule } from 'src/app/layout/layout.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { OrdemCompraService } from './../ordem-compra.service';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToolbarModule} from 'primeng/toolbar';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';
import {InputMaskModule} from 'primeng/inputmask';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';

import { OrdemCompraEditRoutingModule } from './ordem-compra-edit-routing.module';
import { OrdemCompraEditComponent } from './ordem-compra-edit.component';
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
    RadioButtonModule,
    TabViewModule,
    DialogModule,
    InputMaskModule,
    AutoCompleteModule,
    CurrencyMaskModule,
    DropdownModule,  

    SharedModule,
    LayoutModule,
    OrdemCompraEditRoutingModule,


  ],
  declarations: [OrdemCompraEditComponent],
  exports: [OrdemCompraEditComponent],
  providers: [OrdemCompraService,FormMessageService, ErrorService, ProdutoService]
})
export class OrdemCompraEditModule { }
 
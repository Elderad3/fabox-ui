
import { MovimentoService } from './../movimento.service';

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
import { DropdownModule } from 'primeng/dropdown';

import { CurrencyMaskModule } from  'ng2-currency-mask' ;


import { MovimentoEditRoutingModule } from './movimento-edit-routing.module';
import { MovimentoEditComponent } from './movimento-edit.component';
import { ProdutoService } from '../../produto/produto.service';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FormMessageService } from 'src/app/shared/mensagens/form-message.service';
import { ErrorService } from 'src/app/core/error-handler/errors.service';
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
    DropdownModule,
    CurrencyMaskModule,

    SharedModule,
    LayoutModule,
    MovimentoEditRoutingModule,


  ],
  declarations: [MovimentoEditComponent],
  exports: [MovimentoEditComponent],
  providers: [MovimentoService,FormMessageService, ProdutoService, ErrorService]
})
export class MovimentoEditModule { }
 
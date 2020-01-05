import { SharedModule } from 'src/app/shared/shared.module';
import { ProdutoMovimentacoesService } from './produto-movimentacoes/produto-movimentacoes-view/produto-movimentacoes.service';
import { ProdutoService } from './../produto.service';
import { ProdutoMovimentacoesViewComponent } from './produto-movimentacoes/produto-movimentacoes-view/produto-movimentacoes-view.component';
import { ProdutoEditRoutingModule } from './produto-edit-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ProdutoEditComponent } from './produto-edit.component';
import { FormMessageService } from 'src/app/shared/mensagens/form-message.service';
import { ErrorService } from 'src/app/core/error-handler/errors.service';

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
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';

import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';


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
    CardModule,
    

    SharedModule, 
    LayoutModule,
    ProdutoEditRoutingModule, 


  ],
  declarations: [ProdutoEditComponent, ProdutoMovimentacoesViewComponent],
  exports: [ProdutoEditComponent],
  providers: [ {provide: LOCALE_ID, useValue: 'pt' },
  
   ProdutoService, FormMessageService, ErrorService, ProdutoMovimentacoesService]
})
export class ProdutoEditModule { }
 
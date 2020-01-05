import { CoreModule } from './../../../../core/core.module';


import { PessoaService } from './../pessoa.service';

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

import { PessoaEditRoutingModule } from './pessoa-edit-routing.module';

import { PessoaEditComponent } from './pessoa-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { FormMessageService } from 'src/app/shared/mensagens/form-message.service';




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
    
    CoreModule,
    SharedModule,
    LayoutModule,
    PessoaEditRoutingModule,


  ],
  declarations: [PessoaEditComponent],
  exports: [PessoaEditComponent],
  providers: [FormMessageService, PessoaService]
})
export class PessoaEditModule { }
 
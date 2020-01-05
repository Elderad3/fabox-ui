
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToolbarModule} from 'primeng/toolbar';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DialogModule} from 'primeng/dialog';



import { PessoaMainRoutingModule } from './pessoa-main-routing.module';
import { PessoaMainComponent } from './pessoa-main.component';
import { PessoaService } from './../pessoa.service';

import { LayoutModule } from 'src/app/layout/layout.module';
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
    DialogModule,
    

    SharedModule,
    LayoutModule,
    PessoaMainRoutingModule,


  ],
  declarations: [PessoaMainComponent],
  exports: [PessoaMainComponent],
  providers: [PessoaService, ErrorService]
})
export class PessoaMainModule { }
 
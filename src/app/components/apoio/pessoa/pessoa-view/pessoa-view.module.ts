import { SharedModule } from './../../../../shared/shared.module';

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

import { PessoaViewRoutingModule } from './pessoa-view-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { PessoaViewComponent } from './pessoa-view.component';
import { PessoaService } from '../pessoa.service';
import { ErrorService } from 'src/app/core/error-handler/errors.service';



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

    SharedModule,
    LayoutModule,
    PessoaViewRoutingModule,


  ],
  declarations: [PessoaViewComponent],
  exports: [PessoaViewComponent],
  providers: [PessoaService, ErrorService]
})
export class PessoaViewModule { }
 
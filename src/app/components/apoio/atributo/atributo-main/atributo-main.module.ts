import { ErrorService } from './../../../../core/error-handler/errors.service';
import { LayoutModule } from './../../../../layout/layout.module';
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
import {DialogModule} from 'primeng/dialog';



import { AtributoMainRoutingModule } from './atributo-main-routing.module';
import { AtributoMainComponent } from './atributo-main.component';
import { AtributoService } from './../atributo.service';



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
    AtributoMainRoutingModule,


  ],
  declarations: [AtributoMainComponent],
  exports: [AtributoMainComponent],
  providers: [AtributoService, ErrorService]
})
export class AtributoMainModule { }
 
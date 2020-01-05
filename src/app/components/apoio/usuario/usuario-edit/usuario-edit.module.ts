import { LayoutModule } from 'src/app/layout/layout.module';
import { UsuarioService } from './../usuario.service';

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
import {SelectButtonModule} from 'primeng/selectbutton';


import { UsuarioEditRoutingModule } from './usuario-edit-routing.module';

import { UsuarioEditComponent } from './usuario-edit.component';
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
    SelectButtonModule,

    SharedModule,
    LayoutModule,
    UsuarioEditRoutingModule,


  ],
  declarations: [UsuarioEditComponent],
  exports: [UsuarioEditComponent],
  providers: [UsuarioService]
})
export class UsuarioEditModule { }
 
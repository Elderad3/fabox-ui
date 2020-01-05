import { ErrorService } from 'src/app/core/error-handler/errors.service';
import { LayoutModule } from 'src/app/layout/layout.module';

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


import { UsuarioMainRoutingModule } from './usuario-main-routing.module';
import { UsuarioMainComponent } from './usuario-main.component';
import { UsuarioService } from './../usuario.service';
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
    UsuarioMainRoutingModule,


  ],
  declarations: [UsuarioMainComponent],
  exports: [UsuarioMainComponent],
  providers: [UsuarioService, ErrorService]
})
export class UsuarioMainModule { }
 
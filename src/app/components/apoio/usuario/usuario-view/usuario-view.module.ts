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

import { UsuarioViewRoutingModule } from './usuario-view-routing.module';
import { UsuarioService } from './../usuario.service';
import { UsuarioViewComponent } from './usuario-view.component';
import { LayoutModule } from 'src/app/layout/layout.module';
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

    SharedModule,
    LayoutModule,
    UsuarioViewRoutingModule,


  ],
  declarations: [UsuarioViewComponent],
  exports: [UsuarioViewComponent],
  providers: [UsuarioService, ErrorService]
})
export class UsuarioViewModule { }
 
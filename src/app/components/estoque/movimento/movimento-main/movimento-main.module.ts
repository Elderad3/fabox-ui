
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



import { MovimentoMainRoutingModule } from './movimento-main-routing.module';
import { MovimentoMainComponent } from './movimento-main.component';
import { MovimentoService } from './../movimento.service';
import { SharedModule } from 'src/app/shared/shared.module';
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
    DialogModule,
    

    SharedModule,
    LayoutModule,
    MovimentoMainRoutingModule,


  ],
  declarations: [MovimentoMainComponent],
  exports: [MovimentoMainComponent],
  providers: [MovimentoService, ErrorService]
})
export class MovimentoMainModule { }
 
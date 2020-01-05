
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToolbarModule} from 'primeng/toolbar';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';


import { TransacaoMainRoutingModule } from './transacao-main-routing.module';
import { TransacaoMainComponent } from './transacao-main.component';
import { TransacaoService } from './../transacao.service';
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
    FileUploadModule,
    

    SharedModule,
    LayoutModule,
    TransacaoMainRoutingModule,
  
  ],
  declarations: [TransacaoMainComponent],
  exports: [TransacaoMainComponent],
  providers: [TransacaoService,ErrorService]
})
export class TransacaoMainModule { }
 
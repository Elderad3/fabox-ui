
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

import { MovimentoViewRoutingModule } from './movimento-view-routing.module';

import { MovimentoService } from './../movimento.service';
import { MovimentoViewComponent } from './movimento-view.component';
import { SharedModule } from 'primeng/components/common/shared';
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
    RadioButtonModule,
    TabViewModule,

    SharedModule,
    LayoutModule,
    MovimentoViewRoutingModule,


  ],
  declarations: [MovimentoViewComponent],
  exports: [MovimentoViewComponent],
  providers: [MovimentoService, ErrorService]
})
export class MovimentoViewModule { }
 
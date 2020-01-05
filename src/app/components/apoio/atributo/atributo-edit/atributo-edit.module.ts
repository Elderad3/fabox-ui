import { FormMessageService } from './../../../../shared/mensagens/form-message.service';
import { AtributoEditComponent } from './atributo-edit.component';
import { LayoutModule } from './../../../../layout/layout.module';
import { CoreModule } from './../../../../core/core.module';


import { AtributoService } from './../atributo.service';

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
import { DropdownModule } from 'primeng/dropdown';
import {PickListModule} from 'primeng/picklist';

import { AtributoEditRoutingModule } from './atributo-edit-routing.module';
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
    TabViewModule,
    DialogModule,
    InputMaskModule,
    DropdownModule, 
    PickListModule,
    
    CoreModule,
    SharedModule,
    LayoutModule,
    AtributoEditRoutingModule,


  ],
  declarations: [AtributoEditComponent],
  exports: [AtributoEditComponent],
  providers: [FormMessageService, AtributoService]
})
export class AtributoEditModule { }
 
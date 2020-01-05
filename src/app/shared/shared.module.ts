import { DialogModule } from 'primeng/dialog';

import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import localePt from '@angular/common/locales/pt';

import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {FieldsetModule} from 'primeng/fieldset';

import {ToastModule} from 'primeng/toast';

import { PageContainerComponent } from './page-container/page-container.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { MensagensComponent } from './mensagens/mensagens.component';
import { DialogMensageComponent } from './dialog-mensage/dialog-mensage.component';


registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ToastModule,
    FieldsetModule,
    
    
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    DialogModule
  ],
  declarations: [PageContainerComponent, MensagensComponent, DialogMensageComponent,],
  exports:[ ConfirmDialogModule, PageContainerComponent, MensagensComponent,DialogMensageComponent],
  providers:[{provide: LOCALE_ID, useValue: 'pt' }, ConfirmationService, MessageService,]
})
export class SharedModule { }
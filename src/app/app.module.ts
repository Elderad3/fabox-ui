
import { MessageService } from 'primeng/components/common/messageservice';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'primeng/components/common/shared';
import { ToastModule } from 'primeng/toast';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    ToastModule,
    HttpClientModule,



  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

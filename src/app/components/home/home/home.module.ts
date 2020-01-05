import { LayoutModule } from 'src/app/layout/layout.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ChartModule,
    CardModule,

    SharedModule,
    LayoutModule,
    HomeRoutingModule,
   
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule { }
 

import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MegaMenuModule} from 'primeng/megamenu';

import localePt from '@angular/common/locales/pt';
import { MenuComponent } from './menu/menu.component';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MegaMenuModule
    
  ],
  declarations: [MenuComponent],
  exports:[MenuComponent],
  providers:[{provide: LOCALE_ID, useValue: 'pt' },]
})
export class LayoutModule { }

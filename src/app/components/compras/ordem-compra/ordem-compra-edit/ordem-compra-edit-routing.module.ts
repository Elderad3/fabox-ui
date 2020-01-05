import { OrdemCompraEditComponent } from './ordem-compra-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path: '', component: OrdemCompraEditComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdemCompraEditRoutingModule { } 
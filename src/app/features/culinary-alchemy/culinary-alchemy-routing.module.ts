import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared.module';
import { CulinaryAlchemyComponent } from './culinary-alchemy.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./culinary-alchemy.component')
        .then(m => m.CulinaryAlchemyComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule.forRoot()],
  exports: [RouterModule]
})
export class CulinaryAlchemyRoutingModule { }

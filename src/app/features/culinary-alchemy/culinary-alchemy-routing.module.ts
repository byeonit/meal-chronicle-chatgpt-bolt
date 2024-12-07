import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./culinary-alchemy.component')
        .then(m => m.CulinaryAlchemyComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CulinaryAlchemyRoutingModule { }

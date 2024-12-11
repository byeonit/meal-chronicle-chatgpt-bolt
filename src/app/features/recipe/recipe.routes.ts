import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./components/recipe-generator/recipe-generator.component')
        .then(m => m.RecipeGeneratorComponent)
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./components/recipe-list/recipe-list.component')
        .then(m => m.RecipeListComponent)
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
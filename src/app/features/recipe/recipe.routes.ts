import { Routes } from '@angular/router';

export const RECIPE_ROUTES: Routes = [
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
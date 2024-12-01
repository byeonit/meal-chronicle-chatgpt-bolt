import { Routes } from '@angular/router';

export const RECIPE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./components/recipe-generator/recipe-generator.component')
        .then(m => m.RecipeGeneratorComponent)
  }
];
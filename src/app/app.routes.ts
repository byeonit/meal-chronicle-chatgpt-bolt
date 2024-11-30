import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadChildren: () => 
      import('./features/recipe/recipe.routes')
        .then(m => m.RECIPE_ROUTES)
  }
];
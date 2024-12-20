import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  
  {
    path: 'meal-planner',
    loadChildren: () => 
      import('./features/meal-master/meal-master-routing.module')
        .then(m => m.MealMasterRoutingModule)
  },
  {
    path: 'macro',
    loadChildren: () => 
      import('./features/macro-master/macro-master-routing.module')
        .then(m => m.MacroMasterRoutingModule)
  },
  {
    path: 'culinary',
    loadChildren: () => 
      import('./features/culinary-alchemy/culinary-alchemy-routing.module')
        .then(m => m.CulinaryAlchemyRoutingModule)
  },
  {
    path: 'recipes',
    loadChildren: () => 
      import('./features/recipe/recipe.routes')
        .then(m => m.RECIPE_ROUTES)
  },
  {
    path: 'firebase-test',
    loadComponent: () =>
      import('./features/recipe/components/firebase-test/firebase-test.component')
        .then(m => m.FirebaseTestComponent)
  },
  {
    path: 'firebase-test-recipe',
    loadComponent: () =>
      import('./features/recipe/components/firebase-test/firebase-test-recipe.component')
        .then(m => m.FirebaseTestRecipeComponent)
  },
  {
    path: 'ollama-test',
    loadComponent: () =>
      import('./features/recipe/components/ollama-test/ollama-test.component')
        .then(m => m.OllamaTestComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';

// dashboard
import { IndexComponent } from './index';
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';
import { CulinaryAlchemyRoutingModule } from './features/culinary-alchemy/culinary-alchemy-routing.module';
import { KnowledgeBaseComponent } from './pages/knowledge-base/knowledge-base.component';

export const routes: Routes = [
    /*{
        path: '',
        redirectTo: 'recipes',
        pathMatch: 'full'
      },
      {
        path: 'recipes',
        loadChildren: () => 
          import('./features/recipe/recipe.routes')
            .then(m => m.RECIPE_ROUTES)
      },*/
    {
        path: '',
        component: AppLayout,
        children: [
            // dashboard
            { path: '', component: IndexComponent, data: { title: 'Sales Admin' } },
            { path: 'pages/knowledge-base', component: KnowledgeBaseComponent, data: { title: 'Knowledge Base' } },
            { path: 'culinary',
                    loadChildren: () => 
                    import('./features/culinary-alchemy/culinary-alchemy-routing.module')
                      .then(m => m.CulinaryAlchemyRoutingModule)
            },
            { path: 'macro',
                loadChildren: () => 
                import('./features/macro-master/macro-master-routing.module')
                  .then(m => m.MacroMasterRoutingModule)
            },
            { path: 'meal',
                loadChildren: () => 
                import('./features/meal-master/meal-master-routing.module')
                  .then(m => m.MealMasterRoutingModule)
            },
            { path: 'recipe',
                loadChildren: () => 
                import('./features/recipe/recipe.routes')
                  .then(m => m.RecipeRoutingModule)
            },
        ],
    },

    {
      path: '',
      component: AuthLayout,
      children: [
          // pages
          { path: '', loadChildren: () => import('./pages/pages.module').then((d) => d.PagesModule) },

          // auth
          { path: '', loadChildren: () => import('./auth/auth.module').then((d) => d.AuthModule) },
      ],
  },
];

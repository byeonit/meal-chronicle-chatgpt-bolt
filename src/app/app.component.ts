import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <app-header></app-header>
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-container {
      padding-top: 80px;
      padding-bottom: var(--spacing-xl);
      max-width: 1200px;
      margin: 0 auto;
      padding-left: var(--spacing-lg);
      padding-right: var(--spacing-lg);
    }
  `]
})
export class AppComponent {
  title = 'MealChronicle';
}
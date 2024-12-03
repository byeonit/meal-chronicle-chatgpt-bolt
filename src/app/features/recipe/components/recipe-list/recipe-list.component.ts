import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RecipeService } from '../../../../core/services/recipe.service';
import { Recipe } from '../../../../core/models/recipe.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Recent Recipes</mat-card-title>
      </mat-card-header>
      
      <mat-card-content>
        <mat-list>
          <mat-list-item *ngFor="let recipe of recipes$ | async">
            <span matListItemTitle>{{ recipe.title || 'Recipe in Progress' }}</span>
            <span matListItemLine>
              <mat-chip-set>
                <mat-chip *ngFor="let ingredient of recipe.ingredients">
                  {{ ingredient }}
                </mat-chip>
              </mat-chip-set>
            </span>
            <mat-chip-set>
              <mat-chip [color]="getStatusColor(recipe.status)" selected>
                {{ recipe.status }}
              </mat-chip>
            </mat-chip-set>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {
    this.recipes$ = this.recipeService.getRecentRecipes();
  }

  ngOnInit(): void {}

  getStatusColor(status: string): string {
    switch (status) {
      case 'generated':
        return 'primary';
      case 'pending':
        return 'accent';
      case 'failed':
        return 'warn';
      default:
        return '';
    }
  }
}
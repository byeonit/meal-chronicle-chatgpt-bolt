import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OllamaRecipeService } from '../../../../core/services/ollama/ollama-recipe.service';
import {
  AlternativeOllamaRecipeResponse,
  ListOfAlternativeOllamaRecipeResponse,
  OllamaRecipeResponse,
} from '../../../../core/models/ollama-recipe.model';
import { FirestoreService } from '../../../../core/services/firestore.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-ollama-test',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    FormsModule,
  ],
  template: `
    <div class="container">
      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>Ollama Recipe Generator</mat-card-title>
          <mat-card-subtitle
            >Generate recipes using Ollama AI</mat-card-subtitle
          >
        </mat-card-header>

        <mat-card-content>
          <br />
          <button
            mat-raised-button
            color="primary"
            (click)="generateRecipe()"
            [disabled]="loading"
          >
            <mat-icon>auto_awesome</mat-icon>
            Generate Recipe with Ollama
          </button>
          <br />
          <div *ngIf="loading" class="loading-container">
            <mat-spinner diameter="40"></mat-spinner>
            <p class="loading-text">Generating recipe...</p>
          </div>

          <div *ngIf="recipe && !loading" class="recipe-content">
            <div class="recipe-section">
              <h3>Recettes:</h3>
              <h2>{{ recipe.output.title }}</h2>
            </div>

            <div class="recipe-section">
              <h3>MealType:</h3>
              <p>{{ recipe.output.mealType }}</p>
            </div>

            <div class="recipe-section">
              <h3>skillLevel:</h3>
              <p>{{ recipe.output.skillLevel }}</p>
            </div>

            <div class="recipe-section">
              <h3>maxTime:</h3>
              <p>{{ recipe.output.cookingTime }}</p>
            </div>

            <mat-divider></mat-divider>

            <div class="recipe-section">
              <h3>Ingredients:</h3>
              <ul>
                <li *ngFor="let rcp of recipe.output.ingredients">{{ rcp }}</li>
              </ul>
            </div>

            <mat-divider></mat-divider>

            <div class="recipe-section">
              <h3>Instructions:</h3>
              <ol>
                <li *ngFor="let step of recipe.output.instructions">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </mat-card-content>

        <mat-divider></mat-divider>

        <mat-card-actions *ngIf="recipe && !loading">
          <div class="recipe-section">
            <h4>Provide Feedback</h4>

            <mat-button-toggle-group
              name="favoriteColor"
              aria-label="Favorite Color"
              [formControl]="favoriteControl"
            >
              <mat-button-toggle [value]="false">Dislike</mat-button-toggle>
              <mat-button-toggle disabled=""></mat-button-toggle>
              <mat-button-toggle [value]="true">Like</mat-button-toggle>
            </mat-button-toggle-group>

            <mat-form-field>
              <mat-label>Textarea</mat-label>
              <textarea
                matInput
                [(ngModel)]="feedback.comments"
                rows="4"
              ></textarea>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              (click)="submitFeedback()"
            >
              Submit Feedback
            </button>
            <!-- Generate Variations -->
            <button
              mat-raised-button
              color="accent"
              (click)="generateVariations()"
            >
              Generate Variations
            </button>
          </div>
        </mat-card-actions>
      </mat-card>

      <div *ngIf="loadingVariations" class="loading-container">
        <mat-spinner diameter="40"></mat-spinner>
        <p class="loading-text">Generating variations...</p>
      </div>

      <mat-card *ngIf="listOfAlternativeRecipe && !loading">
        <mat-card-content class="recipe-content">
          <!-- Alternative recipe-->
          <div
            *ngFor="let variation of listOfAlternativeRecipe.output"
            class="variation"
          >
            <div class="recipe-section">
              <h3>Recettes:</h3>
              <h2>{{ variation.title }}</h2>
            </div>

            <div class="recipe-section">
              <h3>MealType:</h3>
              <p>{{ variation.mealType }}</p>
            </div>

            <div class="recipe-section">
              <h3>skillLevel:</h3>
              <p>{{ variation.skillLevel }}</p>
            </div>

            <div class="recipe-section">
              <h3>maxTime:</h3>
              <p>{{ variation.cookingTime }}</p>
            </div>

            <div class="recipe-section">
              <h3>MealType:</h3>
              <h2>{{ variation.mealType }}</h2>
            </div>

            <div class="recipe-section">
              <h3>skillLevel:</h3>
              <h2>{{ variation.skillLevel }}</h2>
            </div>

            <mat-divider></mat-divider>

            <div class="recipe-section">
              <h3>Ingredients:</h3>
              <ul>
                <li *ngFor="let rcp of variation.ingredients">{{ rcp }}</li>
              </ul>
            </div>

            <mat-divider></mat-divider>

            <div class="recipe-section">
              <h3>Instructions:</h3>
              <ol>
                <li *ngFor="let step of variation.instructions">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 0 1rem;
      }

      button {
        margin-bottom: 2rem;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem 0;
        gap: 1rem;
      }

      .loading-text {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }

      .recipe-content {
        margin-top: 2rem;
      }

      .recipe-section {
        margin: 1.5rem 0;
      }

      h2 {
        color: var(--text-primary);
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        color: var(--text-secondary);
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
      }

      ol {
        padding-left: 1.5rem;
      }

      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }

      mat-icon {
        margin-right: 0.5rem;
      }
    `,
  ],
})
export class OllamaTestComponent {
  //recipe: OllamaRecipeResponse | null = null;
  recipe: AlternativeOllamaRecipeResponse | null = null;
  listOfAlternativeRecipe: ListOfAlternativeOllamaRecipeResponse | null = null;
  loading = false;

  favoriteControl = new FormControl(true);

  feedback = {
    liked: true,
    comments: '',
  };

  variations: any[] = [];
  loadingVariations = false;

  constructor(
    private ollamaService: OllamaRecipeService,
    private snackBar: MatSnackBar,
    private firestoreService: FirestoreService,
  ) {}

  generateRecipe(): void {
    this.loading = true;
    this.recipe = null;

    const request = {
      ingredients: ['chicken', 'rice', 'vegetables'],
      mealType: 'dinner',
      skillLevel: 'intermediate',
    };

    this.ollamaService.generateRecipe(request).subscribe({
      next: (response) => {
        this.recipe = response;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(
          error.message || 'Error generating recipe. Please try again.',
          'Close',
          { duration: 5000 },
        );
      },
    });
  }

  submitFeedback(): void {
    if (this.recipe) {
      this.recipe.output.id = 'randomeNumber1';

      this.feedback.liked =
        this.favoriteControl.value == null ? true : this.favoriteControl.value;

      this.firestoreService
        .submitFeedback(
          this.recipe.output.id,
          this.feedback.liked,
          this.feedback.comments,
        )
        .then(() => {
          console.log('Feedback submitted!');
          this.feedback = { liked: true, comments: '' }; // Reset feedback form
        })
        .catch((error) => {
          console.error('Error submitting feedback:', error);
        });
    } else {
      console.error('No recipe available for feedback.');
    }
  }

  generateVariations(): void {
    this.loadingVariations = true;

    this.ollamaService
      .generateAlternativeRecipe(this.recipe?.output)
      .subscribe({
        next: (response) => {
          this.listOfAlternativeRecipe = response;
          this.loadingVariations = false;
        },
        error: (error) => {
          this.loadingVariations = false;
          this.snackBar.open(
            error.message || 'Error generating recipe. Please try again.',
            'Close',
            { duration: 5000 },
          );
        },
      });
  }

}

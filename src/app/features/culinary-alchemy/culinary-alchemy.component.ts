import { Component, OnInit } from '@angular/core';
import { PredefinesIngredientsComponent } from './predefines-ingredients/predefines-ingredients.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FirestoreService } from '../../core/services/firestore.service';
import { OllamaRecipeService } from '../../core/services/ollama/ollama-recipe.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecipeGenerateComponent } from '../recipe/components/recipe-generator/recipe-generate/recipe-generate.component';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';
import { MatButtonModule } from '@angular/material/button';
import { CulinaryFeedbackComponent } from './culinary-feedback/culinary-feedback.component';
import { PredefinesIngredientsSteps1Component } from './predefines-ingredients-steps1/predefines-ingredients-steps1.component';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-culinary-alchemy',
  standalone: true,
  imports: [
    CommonModule,
    PredefinesIngredientsComponent,
    PredefinesIngredientsSteps1Component,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    RecipeGenerateComponent,
    RecipeDisplayComponent,
    MatButtonModule,
    CulinaryFeedbackComponent,
    MatStepperModule
  ],
  templateUrl: './culinary-alchemy.component.html',
  styleUrl: './culinary-alchemy.component.css',
})
export class CulinaryAlchemyComponent implements OnInit {
  culinaryForm = new FormGroup({
    ingredients: new FormControl<string[]>([], [Validators.required]),
    mealType: new FormControl<string>('', [Validators.required]),
    maxTime: new FormControl<number>(30, [
      Validators.required,
      Validators.min(1),
      Validators.max(60),
    ]),
    skillLevel: new FormControl<string>('beginner', [Validators.required]),
    dietaryPreference: new FormControl<string>(''),
    cuisineType: new FormControl<string>(''),
    culinaryMode: new FormControl<string>('all-in-one', [Validators.required]), // Added recipeMode
  });

  dietaryPreferences: string[] = [];
  cuisineTypes: string[] = [];
  selectedIngredients: string[] = []; // Tracks selected ingredients from the child component

  loading = false;
  recipe: any;
  feedbackSubmitted = false; // Track feedback submission

  constructor(
    private firestoreService: FirestoreService,
    private ollamaService: OllamaRecipeService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.firestoreService.getFilterOptions('dietary_preferences').subscribe({
      next: (options) => {
        this.dietaryPreferences = options;
      },
      error: (err) => console.error('Error fetching dietary preferences:', err),
    });

    this.firestoreService.getFilterOptions('cuisine_types').subscribe({
      next: (options) => {
        this.cuisineTypes = options;
      },
      error: (err) => console.error('Error fetching cuisine types:', err),
    });
  }

  onIngredientsChange(ingredients: string[]): void {
    this.selectedIngredients = ingredients;
    this.culinaryForm.patchValue({ ingredients }); // Update the form value for 'ingredients'
  }

  onSubmit(): void {
    if (this.culinaryForm.valid) {
      this.loading = true;
      this.recipe = null;

      console.log('Form Data:', this.culinaryForm.value);

      this.ollamaService
        .generateCulinary(
          this.culinaryForm.value,
          this.culinaryForm.value.culinaryMode
            ? this.culinaryForm.value.culinaryMode
            : '',
        )
        .subscribe({
          next: (response) => {
            this.recipe = response;
            this.feedbackSubmitted = false; // Reset feedback status
            console.log('this.recipe = ' + this.recipe);
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open(
              error.message || 'Error generating recipe. Please try again.',
              'Close',
              { duration: 5000 },
            );
          },
          complete: () => {
            this.loading = false;
          },
        });
    } else {
      console.error('Form is invalid');
    }
  }


  onFeedbackSubmitted(): void {
    this.feedbackSubmitted = true; // Mark feedback as submitted
    alert('Thank you for your feedback!');
  }
}

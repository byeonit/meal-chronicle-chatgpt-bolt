import { Component, OnInit } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { OllamaRecipeService } from 'src/app/core/services/ollama/ollama-recipe.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-predefines-ingredients-steps2',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatStepperModule,
    IconModule
  ],
  templateUrl: './predefines-ingredients-steps2.component.html',
  styleUrl: './predefines-ingredients-steps2.component.css'
})
export class PredefinesIngredientsSteps2Component implements OnInit {
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

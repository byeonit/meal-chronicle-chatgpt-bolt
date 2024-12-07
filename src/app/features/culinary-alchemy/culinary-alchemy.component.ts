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

@Component({
  selector: 'app-culinary-alchemy',
  standalone: true,
  imports: [
    CommonModule,
    PredefinesIngredientsComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
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
  });

  dietaryPreferences: string[] = [];
  cuisineTypes: string[] = [];
  selectedIngredients: string[] = []; // Tracks selected ingredients from the child component

  constructor(private firestoreService: FirestoreService) {}

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
      console.log('Form Data:', this.culinaryForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}

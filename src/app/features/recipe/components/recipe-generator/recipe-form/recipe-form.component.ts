import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { IngredientService } from '../../../../../core/services/ingredient.service';
import { RecipeFilters } from '../../../../../core/models/recipe-filters.model';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface RecipeFormData {
  mealType: string;
  maxTime: number;
  skillLevel: string[];
}

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  template: `
    <form [formGroup]="recipeForm" class="recipe-form">
      <mat-form-field appearance="outline" class="mat-form-field-full-width">
        <mat-label>Add ingredients</mat-label>
        <mat-chip-grid #chipGrid>
          <mat-chip-row
            *ngFor="let ingredient of ingredients$ | async"
            (removed)="removeIngredient(ingredient)"
          >
            {{ ingredient }}
            <button matChipRemove>
              <mat-icon>cancel</mat-icon>
            </button>
          </mat-chip-row>
        </mat-chip-grid>
        
        <input
          matInput
          [formControl]="ingredientCtrl"
          [matAutocomplete]="auto"
          [matChipInputFor]="chipGrid"
          (keyup.enter)="addIngredient()"
          placeholder="Type an ingredient..."
        />
        
        <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
          <mat-option
            *ngFor="let suggestion of filteredIngredients$ | async"
            [value]="suggestion"
          >
            {{ suggestion }}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Meal Type</mat-label>
        <mat-select formControlName="mealType">
          <mat-option value="breakfast">Breakfast</mat-option>
          <mat-option value="lunch">Lunch</mat-option>
          <mat-option value="dinner">Dinner</mat-option>
          <mat-option value="snack">Snack</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Maximum Preparation Time (minutes)</mat-label>
        <input matInput type="number" formControlName="maxTime" min="0">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Skill Level</mat-label>
        <mat-select formControlName="skillLevel" multiple>
          <mat-option *ngFor="let level of skillLevels" [value]="level">{{ level }}</mat-option>
        </mat-select>
      </mat-form-field>

      <div class="mat-action-row">
        <button
          mat-raised-button
          color="primary"
          (click)="onGenerateClick()"
          [disabled]="(ingredients$ | async)?.length === 0"
        >
          <mat-icon>restaurant</mat-icon>
          Generate Recipe
        </button>
      </div>
    </form>
  `,
  styles: [
    `
    .recipe-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    `,
  ],
})
export class RecipeFormComponent {
  @Output() generate = new EventEmitter<RecipeFilters>();

  ingredients$ = new BehaviorSubject<string[]>([]);
  ingredientCtrl = new FormControl('');
  filteredIngredients$: Observable<string[]>;

  mealTypeOptions: string[] = ['breakfast', 'lunch', 'dinner', 'snack'];
  skillLevels: string[] = ['beginner', 'intermediate', 'expert'];

  recipeForm: FormGroup<{
    mealType: FormControl<string | null>;
    maxTime: FormControl<number | null>;
    skillLevel: FormControl<string[] | null>;
  }>;

  constructor(
    private ingredientService: IngredientService,
    private fb: FormBuilder
  ) {
    this.recipeForm = this.fb.group({
      mealType: [''],
      maxTime: [60],
      skillLevel: [[] as string[]],
    });

    this.filteredIngredients$ = this.ingredientCtrl.valueChanges.pipe(
      startWith(''),
      switchMap((value) =>
        value
          ? this.ingredientService.searchIngredients(value)
          : new Observable<string[]>((observer) => {
              observer.next([]);
              observer.complete();
            })
      )
    );
  }

  addIngredient(): void {
    const value = this.ingredientCtrl.value?.trim();
    if (value && !this.ingredients$.getValue().includes(value)) {
      const updatedIngredients = [...this.ingredients$.getValue(), value];
      this.ingredients$.next(updatedIngredients);
      this.ingredientCtrl.setValue('');
    }
  }

  selected(event: any): void {
    const value = event.option.value;
    const currentIngredients = this.ingredients$.getValue();
    if (!currentIngredients.includes(value)) {
      this.ingredients$.next([...currentIngredients, value]);
      this.ingredientCtrl.setValue('');
    }
  }

  removeIngredient(ingredient: string): void {
    const updatedIngredients = this.ingredients$
      .getValue()
      .filter((item) => item !== ingredient);
    this.ingredients$.next(updatedIngredients);
  }

  onGenerateClick(): void {
    const formValue = this.recipeForm.value;
    
    const filters: RecipeFilters = {
      ingredients: this.ingredients$.getValue(),
      mealType: formValue.mealType || undefined,
      maxTime: formValue.maxTime || undefined,
      skillLevel: formValue.skillLevel || undefined,
    };

    this.generate.emit(filters);
  }
}
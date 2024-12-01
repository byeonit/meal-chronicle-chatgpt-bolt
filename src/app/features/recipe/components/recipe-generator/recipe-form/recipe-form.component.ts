import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { IngredientService } from '../../../../../core/services/ingredient.service';
import { IngredientDocument } from '../../../../../core/models/ingredient.model';

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
    MatButtonModule
  ],
  template: `
    <div class="mat-typography">
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
    </div>
  `,
  host: {
    class: 'mat-typography'
  }
})
export class RecipeFormComponent {
  @Output() generate = new EventEmitter<string[]>();  // Emits the final list of ingredients for recipe generation
  
  ingredients$ = new BehaviorSubject<string[]>([]); // BehaviorSubject to track the ingredients list
  ingredientCtrl = new FormControl(''); // FormControl for ingredient input
  filteredIngredients$: Observable<string[]>; // Observable for filtered ingredient suggestions

  constructor(private ingredientService: IngredientService) {    
    this.filteredIngredients$ = this.ingredientCtrl.valueChanges.pipe(
      startWith(''),
      switchMap((value) =>
        value ? this.ingredientService.searchIngredients(value) : new Observable<string[]>((observer) => {
          observer.next([]);
          observer.complete();
        })
      )
    );
  }

  /**
   * Add the currently entered ingredient to the list
   */
  addIngredient(): void {
    const value = this.ingredientCtrl.value?.trim();
    if (value && !this.ingredients$.getValue().includes(value)) {
      const updatedIngredients = [...this.ingredients$.getValue(), value];
      this.ingredients$.next(updatedIngredients); // Update the BehaviorSubject
      this.ingredientCtrl.setValue(''); // Clear the input field
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

  /**
   * Remove an ingredient from the list
   */
  removeIngredient(ingredient: string): void {
    const updatedIngredients = this.ingredients$.getValue().filter((item) => item !== ingredient);
    this.ingredients$.next(updatedIngredients); // Update the BehaviorSubject
  }

  /**
   * Emit the current ingredients list when generating the recipe
   */
  onGenerateClick(): void {
    this.generate.emit(this.ingredients$.getValue()); // Emit the current list of ingredients
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FirestoreService } from '../../../../core/services/firestore.service';

@Component({
  selector: 'app-firebase-test',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Firebase Connection Test</mat-card-title>
      </mat-card-header>
      
      <mat-card-content>
        <mat-list>
          <mat-list-item *ngFor="let ingredient of ingredients">
            {{ ingredient }}
          </mat-list-item>
        </mat-list>
      </mat-card-content>
      
      <mat-card-actions align="end">
        <button mat-raised-button color="primary" (click)="testAddIngredient()">
          <mat-icon>add</mat-icon>
          Add Test Ingredient
        </button>
        <button mat-raised-button color="accent" (click)="testFetchIngredients()">
          <mat-icon>refresh</mat-icon>
          Fetch Ingredients
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class FirebaseTestComponent implements OnInit {
  ingredients: string[] = [];
  private readonly testUserId = 'test-user-1';

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.testFetchIngredients();
  }

  async testAddIngredient(): Promise<void> {
    try {
      const testIngredient = `Test Ingredient ${Date.now()}`;
      await this.firestoreService.addIngredient(this.testUserId, testIngredient);
      console.log('Test ingredient added successfully');
      this.testFetchIngredients();
    } catch (error) {
      console.error('Error adding test ingredient:', error);
    }
  }

  testFetchIngredients(): void {
    this.firestoreService.getIngredients(this.testUserId)
      .subscribe({
        next: (ingredients) => {
          this.ingredients = ingredients;
          console.log('Ingredients fetched successfully:', this.ingredients);
        },
        error: (error) => {
          console.error('Error fetching ingredients:', error);
        }
      });
  }
}
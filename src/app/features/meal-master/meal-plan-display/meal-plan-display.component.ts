import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-meal-plan-display',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './meal-plan-display.component.html',
  styleUrl: './meal-plan-display.component.css'
})
export class MealPlanDisplayComponent {
  @Input() mealPlan: any[] = [];
}

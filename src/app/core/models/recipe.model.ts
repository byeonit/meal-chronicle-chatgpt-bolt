import { MealType } from './recipe-filters.model';

export interface Recipe {
  id?: string;
  ingredients: string[];
  title?: string;
  instructions?: string[];
  createdAt: Date;
  userId?: string;
  status: 'pending' | 'generated' | 'failed';
  mealType: MealType;
  tools: string[];
  time: number;
  skillLevel: string[];
}

export interface RecipeResponse {
  title: string;
  instructions: string[];
}
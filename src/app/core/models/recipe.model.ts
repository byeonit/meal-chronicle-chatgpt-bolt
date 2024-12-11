import { MealType } from './recipe-filters.model';

export interface Recipe {
  id?: string;
  title: string;
  ingredients: string[];
  instructions: string[];
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

export interface DummyRecipe {
  id?: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  mealType: MealType;
  time: number;
  skillLevel: string[];
  status: 'generated';
}
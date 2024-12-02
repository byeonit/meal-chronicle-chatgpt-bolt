export interface RecipeFilters {
  ingredients: string[];
  mealType?: string | null;
  tools?: string[];
  maxTime?: number;
  skillLevel?: string[];
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type SkillLevel = 'beginner' | 'intermediate' | 'expert';

export interface RecipeMetadata {
  mealType: MealType;
  tools: string[];
  time: number;
  skillLevel: SkillLevel;
}
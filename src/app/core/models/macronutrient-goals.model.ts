export interface MacronutrientGoals {
  proteinGoal: number; // Protein goal (in grams)
  carbsGoal: number; // Carbs goal (in grams)
  fatsGoal: number; // Fats goal (in grams)
  targetCalories: number; // Total calorie goal
  fitnessGoal: string; // Fitness goal (e.g., muscle gaining, weight loss)
}

export interface MacronutrientRecipe {
  output: {
    title: string;
    ingredients: string[];
    instructions: string[];
    prepTime: number;
    cookTime: number;
    nutritionalBreakdown: NutritionalBreakdown;
  };
  error?: string;
}

export interface NutritionalBreakdown {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

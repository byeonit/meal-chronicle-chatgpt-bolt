export interface MealPlanRequest {
    durationDays: number;             // Number of days for the meal plan (e.g., 3, 5, or 7)
    dietaryPreferences: string[];    // List of selected dietary preferences
    macronutrientGoals: {
      protein: number;               // Protein goal in grams
      carbs: number;                 // Carbs goal in grams
      fats: number;                  // Fats goal in grams
      calories: number;              // Total calorie goal
    };
    fitnessGoal: string;             // User's overall fitness goal (e.g., muscle gain, weight loss)
  }
  
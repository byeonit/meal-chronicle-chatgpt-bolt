export interface OllamaRecipeRequest {
  ingredients: string[];
  mealType: string;
  skillLevel: string;
  maxTime: number;
}

export interface OllamaRecipeResponse {
  title: string;
  ingredients: string[];
  instructions: string[];
  mealType: string;
  skillLevel: string;
  maxTime: number;
  maxPeople: number;
  calories: number;
  error?: string;
}
//formate for n8n workflow
export interface AlternativeOllamaRecipeResponse {
  output: {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string[];
    mealType: string;
    skillLevel: string;
    cookingTime: number;
    servings: number;
    caloriesPerServing: number;
    totalCalories: number;
  };
  error?: string;
}

export interface ListOfAlternativeOllamaRecipeResponse {
  output: [
    {
      id: string;
      title: string;
      ingredients: string[];
      instructions: string[];
      mealType: string;
      skillLevel: string;
      cookingTime: number;
      servings: number;
      caloriesPerServing: number;
      totalCalories: number;
    },
  ];
  error?: string;
}

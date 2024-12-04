export interface OllamaRecipeRequest {
  ingredients: string[];
  mealType: string;
  skillLevel: string;
}

export interface OllamaRecipeResponse {
  title: string;
  ingredients: string[];
  instructions: string[];
  error?: string;
}
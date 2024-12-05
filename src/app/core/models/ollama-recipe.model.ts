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
//formate for n8n workflow
export interface  AlternativeOllamaRecipeResponse{
  output: {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string[];
  },
  error?: string;
}
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
  error?: string;
}
//formate for n8n workflow
export interface  AlternativeOllamaRecipeResponse{
  output: {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string[];
    mealType: string;
    skillLevel: string;
    maxTime: number;
  },
  error?: string;
}

export interface  ListOfAlternativeOllamaRecipeResponse{
  output: [{
    id: string;
    title: string;
    ingredients: string[];
    instructions: string[];
    mealType: string;
    skillLevel: string;
    maxTime: number;
  }],
  error?: string;
}
export interface Recipe {
  id?: string;
  ingredients: string[];
  title?: string;
  instructions?: string[];
  createdAt: Date;
  userId?: string;
  status: 'pending' | 'generated' | 'failed';
}

export interface RecipeResponse {
  title: string;
  instructions: string[];
}
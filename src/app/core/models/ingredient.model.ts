export interface IngredientDocument {
  id?: string;
  ingredientList: string[];
  createdAt: Date;
  userId?: string;
}

export interface IngredientData {
  [key: string]: any;
  ingredientList: string[];
}
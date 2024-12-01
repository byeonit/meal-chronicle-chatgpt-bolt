export interface IngredientDocument {
  ingredientList: string[];
  createdAt: Date;
  userId: string;
}

export interface IngredientData {
  [key: string]: any;
  ingredientList: string[];
}
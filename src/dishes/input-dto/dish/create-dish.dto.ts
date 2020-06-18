import { Ingredient } from '../../models';

export interface CreateDishDTO {
  readonly name: string;
  readonly ingredients: [Ingredient];
  readonly image: string;
  readonly details: [{ size: string; price: number }];
}

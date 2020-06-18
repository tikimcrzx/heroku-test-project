import { Ingredient } from '../../models';

export interface UpdateDishDTO {
  readonly name: string;
  readonly ingredients: [Ingredient];
  readonly image: string;
  readonly details: [{ size: string; price: number }];
}

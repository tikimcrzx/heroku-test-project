import { Dish } from '../../../dishes/models';

export interface CreateDishPreOrderDTO {
  readonly quantity: number;
  readonly dish: Dish;
  readonly status: boolean;
}

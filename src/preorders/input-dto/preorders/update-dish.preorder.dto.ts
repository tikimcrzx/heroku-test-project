import { Dish } from '../../../dishes/models';

export interface UpdateDishPreOrderDTO {
  readonly quantity: number;
  readonly dish: Dish;
  readonly status: boolean;
}

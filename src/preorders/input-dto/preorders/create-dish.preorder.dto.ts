import { Dish } from '../../../dishes/models';

export interface CreateDishPreOrderDTO {
  readonly quantity: number;
  readonly dish: string;
  readonly status: boolean;
}

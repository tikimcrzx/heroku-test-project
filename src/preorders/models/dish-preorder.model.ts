import { Document } from 'mongoose';
import { Dish } from '../../dishes/models';

export interface DishPreOrder extends Document {
  quantity: number;
  dish: string;
  status: boolean;
}

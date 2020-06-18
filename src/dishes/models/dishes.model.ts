import { Document } from 'mongoose';
import { Ingredient } from '.';

export interface Dish extends Document {
  name: string;
  ingredients: [Ingredient];
  image: string;
  details: [{ size: string; price: number }];
}

import { Document } from 'mongoose';
import { Ingredient } from '.';

export interface Dish extends Document {
  _id: string;
  name: string;
  ingredients: [Ingredient];
  image: string;
  details: [{ size: string; price: number }];
}

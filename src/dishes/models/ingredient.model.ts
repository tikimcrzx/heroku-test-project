import { Document } from 'mongoose';

export interface Ingredient extends Document {
  _id: string;
  name: string;
}

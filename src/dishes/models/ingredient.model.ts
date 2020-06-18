import { Document } from 'mongoose';

export interface Ingredient extends Document {
  name: string;
}

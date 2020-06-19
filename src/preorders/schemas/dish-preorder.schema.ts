import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export const DishPreOrder = new Schema(
  {
    quantity: { type: Number, default: 1 },
    dish: { type: ObjectId, ref: 'Dish' },
    status: { type: Boolean, default: false },
  },
  { timestamps: true },
);

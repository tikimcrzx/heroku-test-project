import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { getAllSizes } from '../enums/sizes.enum';

export const DishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      unique: true,
    },
    ingredients: [{ type: ObjectId, required: true }],
    image: { type: String, required: true, unique: true },
    details: [
      {
        size: { type: String, enum: getAllSizes(), required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

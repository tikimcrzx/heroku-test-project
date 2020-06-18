import { Schema } from 'mongoose';

export const IngredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true,
    },
  },
  { timestamps: true },
);

import { Schema } from 'mongoose';

export const ContactSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      maxlength: 20,
    },
  },
  { timestamps: true },
);

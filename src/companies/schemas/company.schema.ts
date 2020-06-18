import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { getAllCompanyStatus } from '../enums/company-status.enum';

export const CompanySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
      unique: true,
    },
    contact: { type: ObjectId, ref: 'Contact', required: true },
    status: { type: String, required: true, enum: getAllCompanyStatus() },
  },
  { timestamps: true },
);

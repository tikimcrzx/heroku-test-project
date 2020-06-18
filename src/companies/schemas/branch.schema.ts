import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { getAllBranchStatus } from '../enums/branch-status.enum';

export const BranchSchema = new Schema(
  {
    name: { type: String, trim: true, required: true, maxlength: 100 },
    contact: { type: ObjectId, ref: 'Contact', required: true },
    status: { type: String, required: true, enum: getAllBranchStatus() },
    company: { type: ObjectId, ref: 'Company', required: true },
    menu: [{ type: ObjectId, ref: 'Menu', required: true }],
  },
  { timestamps: true },
);

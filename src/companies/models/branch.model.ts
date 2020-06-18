import { BranchStatus } from '../enums/branch-status.enum';
import { Document } from 'mongoose';
import { Contact } from './index';
import { Dish } from '../../dishes/models';

export interface Branch extends Document {
  _id: string;
  name: string;
  contact: Contact;
  status: BranchStatus;
  menu: [Dish];
}

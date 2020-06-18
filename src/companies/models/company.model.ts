import { CompanyStatus } from '../enums/company-status.enum';
import { Contact } from './contact.model';
import { Document } from 'mongoose';

export interface Company extends Document {
  _id: string;
  name: string;
  contact: Contact;
  status: CompanyStatus;
}

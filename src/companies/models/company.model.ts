import { CompanyStatus } from '../enums/company-status.enum';
import { Contact } from './contact.model';
import { Document } from 'mongoose';

export interface Company extends Document {
  name: string;
  contact: Contact;
  status: CompanyStatus;
}

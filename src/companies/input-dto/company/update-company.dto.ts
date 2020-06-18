import { CompanyStatus } from '../../enums/company-status.enum';
import { Contact } from '../../models';

export interface UpdateCompanyDTO {
  readonly name: string;
  readonly status: CompanyStatus;
  readonly contact: Contact;
}

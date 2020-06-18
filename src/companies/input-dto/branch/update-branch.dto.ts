import { BranchStatus } from '../../enums/branch-status.enum';
import { Contact } from '../../models';
import { Dish } from '../../../dishes/models';

export interface UpdateBranchDTO {
  readonly name: string;
  readonly contact: Contact;
  readonly status: BranchStatus;
  readonly menu: [Dish];
}

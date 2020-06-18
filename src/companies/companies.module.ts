import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchSchema, CompanySchema, ContactSchema } from './schemas';

import { ContactService } from './services/contact.service';
import { ContactController } from './controllers/contact.controller';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { BranchService } from './services/branch.service';
import { BranchController } from './controllers/branch.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Branch', schema: BranchSchema, collection: 'branches' },
      { name: 'Company', schema: CompanySchema, collection: 'companies' },
      { name: 'Contact', schema: ContactSchema, collection: 'contacts' },
    ]),
  ],
  providers: [BranchService, CompanyService, ContactService],
  controllers: [BranchController, CompanyController, ContactController],
  exports: [MongooseModule],
})
export class CompaniesModule {}

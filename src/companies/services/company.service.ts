import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '../models';
import { CreateCompanyDTO, UpdateCompanyDTO } from '../input-dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private readonly _companyModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDTO): Promise<Company> {
    const company: Company = await this._companyModel.create(createCompanyDto);
    const companySaved = company.save();
    return companySaved;
  }

  async delete(id: string): Promise<boolean> {
    const company: Company = await this._companyModel.findByIdAndDelete(id);
    if (!company) throw new NotFoundException(`Comapny ${id} not found`);
    return true;
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDTO,
  ): Promise<Company> {
    const company: Company = await this._companyModel.findById(id);

    if (!company) throw new NotFoundException(`Comapany ${id} not found`);
    company.name = updateCompanyDto.name;
    company.status = updateCompanyDto.status;
    company.contact = updateCompanyDto.contact;

    return company;
  }

  async findById(id: string): Promise<Company> {
    const company: Company = await (
      await this._companyModel.findById(id)
    ).populate({ path: 'contact', model: 'Contact', select: 'name phone' });
    if (!company) throw new NotFoundException(`Comapany ${id} not found`);
    return company;
  }

  async findAll(): Promise<Company[]> {
    const companies: Company[] = await this._companyModel
      .find()
      .populate({ path: 'contact', model: 'Contact', select: 'name phone' });
    return companies;
  }
}

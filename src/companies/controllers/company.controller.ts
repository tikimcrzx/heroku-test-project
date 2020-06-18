import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Put,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { Response } from 'express';
import { UpdateCompanyDTO, CreateCompanyDTO } from '../input-dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly _companyService: CompanyService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const companies = await this._companyService.findAll();
    res.status(HttpStatus.OK).json(companies);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const company = await this._companyService.findById(id);
    res.status(HttpStatus.OK).json(company);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDTO,
    @Res() res: Response,
  ) {
    const updatedCompany = await this._companyService.update(
      id,
      updateCompanyDto,
    );
    res.status(HttpStatus.OK).json(updatedCompany);
  }

  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDTO,
    @Res() res: Response,
  ) {
    const createdCompany = await this._companyService.create(createCompanyDto);
    res.status(HttpStatus.CREATED).json(createdCompany);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const deletedCompany = await this._companyService.delete(id);
    res.status(HttpStatus.OK).json(deletedCompany);
  }
}

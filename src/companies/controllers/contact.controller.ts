import {
  Controller,
  Get,
  HttpStatus,
  Res,
  Param,
  Put,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { Response } from 'express';
import { UpdateContactDTO, CreateContactDTO } from '../input-dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly _contactService: ContactService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const contacts = await this._contactService.findAll();
    res.status(HttpStatus.OK).json(contacts);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const contact = await this._contactService.findById(id);
    res.status(HttpStatus.OK).json(contact);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDTO,
    @Res() res: Response,
  ) {
    const updatedContact = await this._contactService.update(
      id,
      updateContactDto,
    );
    res.status(HttpStatus.OK).json(updatedContact);
  }

  @Post()
  async create(
    @Body() createContactDto: CreateContactDTO,
    @Res() res: Response,
  ) {
    const createdContact = await this._contactService.create(createContactDto);
    res.status(HttpStatus.CREATED).json(createdContact);
  }

  @Delete()
  async delete(@Param('id') id: string, @Res() res: Response) {
    const deletdContact = await this._contactService.delete(id);
    res.status(HttpStatus.OK).json(deletdContact);
  }
}

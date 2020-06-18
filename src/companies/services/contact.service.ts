import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from '../models';
import { CreateContactDTO, UpdateContactDTO } from '../input-dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private readonly _contactModel: Model<Contact>,
  ) {}

  async create(createContactDto: CreateContactDTO): Promise<Contact> {
    const contact: Contact = await this._contactModel.create(createContactDto);
    const contactSaved = contact.save();
    return contactSaved;
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDTO,
  ): Promise<Contact> {
    const contact: Contact = await this._contactModel.findById(id);

    if (!contact) throw new NotFoundException(`Contact ${id} not found`);

    contact.name = updateContactDto.name;
    contact.phone = updateContactDto.phone;

    return contact;
  }

  async delete(id: string): Promise<boolean> {
    const contact: Contact = await this._contactModel.findById(id);

    if (!contact) throw new NotFoundException(`Contact ${id} not found`);

    contact.remove();
    contact.save();

    return true;
  }

  async findById(id: string): Promise<Contact> {
    const contact: Contact = await this._contactModel.findById(id);
    if (!contact) throw new NotFoundException(`Contact ${id} not found`);
    return contact;
  }

  async findAll(): Promise<Contact[]> {
    const contacts: Contact[] = await this._contactModel.find();
    return contacts;
  }
}

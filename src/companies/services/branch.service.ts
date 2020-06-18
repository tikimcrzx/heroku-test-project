import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch } from '../models';
import { CreateBranchDTO, UpdateBranchDTO } from '../input-dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel('Branch') private readonly _branchModel: Model<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDTO): Promise<Branch> {
    const branch: Branch = await this._branchModel.create(createBranchDto);
    const branchSaved = branch.save();
    return branchSaved;
  }

  async delete(id: string): Promise<boolean> {
    const branch: Branch = await this._branchModel.findByIdAndDelete(id);
    if (!branch) throw new NotFoundException(`Branch ${id} not found`);
    return true;
  }

  async update(id: string, updateBranchDto: UpdateBranchDTO): Promise<Branch> {
    const branch: Branch = await this._branchModel.findById(id);
    if (!branch) throw new NotFoundException(`Branch ${id} not found`);
    branch.name = updateBranchDto.name;
    branch.contact = updateBranchDto.contact;
    branch.menu = updateBranchDto.menu;
    branch.status = updateBranchDto.status;
    branch.save();

    return branch;
  }

  async findById(id: string): Promise<Branch> {
    const branch: Branch = await this._branchModel.findById(id).populate({
      path: 'menu',
      model: 'Dish',
      populate: { path: 'ingredients', model: 'Ingredient', select: 'name' },
    });
    if (!branch) throw new NotFoundException(`Branch ${id} not found`);
    return branch;
  }

  async findAll(): Promise<Branch[]> {
    const branches: Branch[] = await this._branchModel.find().populate({
      path: 'menu',
      model: 'Dish',
      populate: { path: 'ingredients', model: 'Ingredient', select: 'name' },
    });
    return branches;
  }
}

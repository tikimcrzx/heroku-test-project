import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch } from '../models';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel('Branch') private readonly _branchModel: Model<Branch>,
  ) {}
}

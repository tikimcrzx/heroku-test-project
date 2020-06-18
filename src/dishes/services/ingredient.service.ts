import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from '../models';
import { CreateIngredientDTO, UpdateIngredientDTO } from '../input-dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel('Ingredient')
    private readonly _ingredientModel: Model<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDTO): Promise<Ingredient> {
    const ingredient: Ingredient = await this._ingredientModel.create(
      createIngredientDto,
    );
    const ingredientSaved = ingredient.save();
    return ingredientSaved;
  }

  async update(
    id: string,
    updateIngredientDto: UpdateIngredientDTO,
  ): Promise<Ingredient> {
    const ingredient: Ingredient = await this._ingredientModel.findById(id);

    if (!ingredient) throw new NotFoundException(`Ingredient ${id} not found`);
    ingredient.name = updateIngredientDto.name;
    ingredient.save();

    return ingredient;
  }

  async delete(id: string): Promise<boolean> {
    const ingredient: Ingredient = await this._ingredientModel.findByIdAndDelete(
      id,
    );
    if (!ingredient) throw new NotFoundException(`Ingredient ${id} not found`);
    return true;
  }

  async findAll(): Promise<Ingredient[]> {
    const ingredients: Ingredient[] = await this._ingredientModel.find();
    return ingredients;
  }

  async findById(id: string): Promise<Ingredient> {
    const ingredient: Ingredient = await this._ingredientModel.findById(id);
    if (!ingredient) throw new NotFoundException(`Ingredient ${id} not found`);
    return ingredient;
  }
}

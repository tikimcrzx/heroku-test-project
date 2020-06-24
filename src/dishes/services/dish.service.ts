import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dish } from '../models';
import { CreateDishDTO, UpdateDishDTO } from '../input-dto';
import { suggestionOrder } from '../utils/suggestion-card';

@Injectable()
export class DishService {
  constructor(@InjectModel('Dish') private readonly _dishModel: Model<Dish>) {}

  async create(createDishDto: CreateDishDTO): Promise<Dish> {
    const dish: Dish = await this._dishModel.create(createDishDto);
    const dishSaved = dish.save();
    return dishSaved;
  }

  async update(id: string, updateDishDto: UpdateDishDTO): Promise<Dish> {
    const dish: Dish = await this._dishModel.findById(id);

    if (!dish) throw new NotFoundException(`Dish ${id} not found`);

    dish.name = updateDishDto.name;
    dish.details = updateDishDto.details;
    dish.image = updateDishDto.image;
    dish.ingredients = updateDishDto.ingredients;
    dish.save();

    return dish;
  }

  async delete(id: string): Promise<boolean> {
    const dish: Dish = await this._dishModel.findByIdAndDelete(id);
    if (!dish) throw new NotFoundException(`Dish ${id} not found`);
    return true;
  }

  async findAll(): Promise<Dish[]> {
    const dishes: Dish[] = await this._dishModel
      .find()
      .populate({ path: 'ingredients', model: 'Ingredient', select: 'name' });
    return dishes;
  }

  async findOne(name: string): Promise<Dish> {
    const dish: Dish = await this._dishModel
      .findOne({ name })
      .populate({ path: 'ingredients', model: 'Ingredient', select: 'name' });

    return dish;
    // return { fulfillmentMessages: suggestionOrder() };
  }

  async findById(id: string): Promise<Dish> {
    const dish: Dish = await this._dishModel
      .findById(id)
      .populate({ path: 'ingredients', model: 'Ingredient', select: 'name' });
    if (!dish) throw new NotFoundException(`Dish ${id} not found`);
    return dish;
  }
}

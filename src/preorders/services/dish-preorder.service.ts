import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DishPreOrder } from '../models/dish-preorder.model';
import { CreateDishPreOrderDTO } from '../input-dto';
import { suggestionOrder } from '../utils/suggestion-card';

@Injectable()
export class DishPreOrderService {
  constructor(
    @InjectModel('DishPreOrder')
    private readonly _dishPreOrder: Model<DishPreOrder>,
  ) {}

  async order(name: string): Promise<any> {
    const dishes: any = await this.findAll();
    let _id = '';
    let quantity = 0;
    for (let index = 0; index < dishes.length; index++) {
      const element = dishes[index];
      if (element.dish.name === name) {
        _id = element._id;
        quantity = element.quantity;
      }
    }
    quantity++;
    console.log(_id);
    await this._dishPreOrder.findByIdAndUpdate(_id, { quantity });
    return { fulfillmentMessages: suggestionOrder() };
  }

  async create(
    createDishPreOrder: CreateDishPreOrderDTO,
  ): Promise<DishPreOrder> {
    const duplicated: DishPreOrder = await this._dishPreOrder.findOne({
      dish: createDishPreOrder.dish,
    });

    let dishPreOrder: DishPreOrder;

    if (!duplicated) {
      dishPreOrder = await this._dishPreOrder.create(createDishPreOrder);
    } else {
      dishPreOrder = duplicated;
      dishPreOrder.quantity++;
    }

    await dishPreOrder.save();
    return dishPreOrder;
  }

  async update(id: string): Promise<DishPreOrder> {
    const dishPreOrder: DishPreOrder = await this._dishPreOrder.findById(id);
    if (!dishPreOrder) throw new NotFoundException(`Pre Order ${id} not found`);
    dishPreOrder.status = true;
    dishPreOrder.save();
    return dishPreOrder;
  }

  async findById(id: string): Promise<DishPreOrder> {
    const dishPreOrder: DishPreOrder = await this._dishPreOrder
      .findById(id)
      .select('-createdAt -updatedAt -__v')
      .populate({
        path: 'dish',
        model: 'Dish',
        select: '-createdAt -updatedAt -__v',
        populate: { path: 'ingredients', model: 'Ingredient', select: 'name' },
      });
    if (!dishPreOrder) throw new NotFoundException(`Pre Order ${id} not found`);
    return dishPreOrder;
  }

  async findAll(): Promise<DishPreOrder[]> {
    const dishPreOrders: DishPreOrder[] = await this._dishPreOrder
      .find()
      .select('-createdAt -updatedAt -__v')
      .populate({
        path: 'dish',
        model: 'Dish',
        select: '-createdAt -updatedAt -__v',
        populate: { path: 'ingredients', model: 'Ingredient', select: 'name' },
      });
    return dishPreOrders;
  }
}

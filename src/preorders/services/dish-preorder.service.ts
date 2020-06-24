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

  async order(): Promise<any> {
    // const dishes: any = await this.findAll();
    // let _id: string;
    // let quantity: number;

    // for (let index = 0; index < dishes.length; index++) {
    //   if (dishes[index].dish.name == name) {
    //     _id = dishes[index]._id;
    //     quantity = dishes[index].quantity;
    //   }
    // }
    // quantity++;
    // await this._dishPreOrder.findByIdAndUpdate(_id, { quantity });
    return {
      fulfillmentMessages: suggestionOrder(
        'Seguir Ordenando',
        'Ordenar',
        'Terminar',
      ),
    };
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

  async findDish(dish: string): Promise<DishPreOrder> {
    const dishPreOrder: DishPreOrder = await this._dishPreOrder.findOne({
      dish,
    });
    if (!dishPreOrder) return null;
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

  // https://www.canva.com/es_mx/aprende/10-hacks-usados-en-diseno-de-menus-para-que-ordenes-mas/
  async finish(): Promise<any> {
    const dishPreOrders: any = await this.findAll();
    let text = '';
    let price = 0;
    for (let index = 0; index < dishPreOrders.length; index++) {
      text += `${dishPreOrders[index].quantity} ${
        dishPreOrders[index].dish.name
      } = $${dishPreOrders[index].dish.details[2].price *
        dishPreOrders[index].quantity} \n`;

      price +=
        dishPreOrders[index].dish.details[2].price *
        dishPreOrders[index].quantity;
    }
    const total = `Resumen son ${text} \n total = $${price}`;

    return {
      fulfillmentMessages: [{ text: { text: [total] } }],
    };
  }
}

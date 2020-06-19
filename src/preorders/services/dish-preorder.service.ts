import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DishPreOrder } from "../models/dish-preorder.model";
import { CreateDishPreOrderDTO } from "../input-dto";

@Injectable()
export class DishPreOrderService {
  constructor(
    @InjectModel("DishPreOrder") private readonly _dishPreOrder: Model<
      DishPreOrder
    >,
  ) {}

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
      .select("-createdAt -updatedAt -__v")
      .populate({
        path: "dish",
        model: "Dish",
        select: "-createdAt -updatedAt -__v",
        populate: { path: "ingredients", model: "Ingredient", select: "name" },
      });
    if (!dishPreOrder) throw new NotFoundException(`Pre Order ${id} not found`);
    return dishPreOrder;
  }

  async findAll(): Promise<DishPreOrder[]> {
    const dishPreOrders: DishPreOrder[] = await this._dishPreOrder
      .find()
      .select("-createdAt -updatedAt -__v")
      .populate({
        path: "dish",
        model: "Dish",
        select: "-createdAt -updatedAt -__v",
        populate: { path: "ingredients", model: "Ingredient", select: "name" },
      });
    return dishPreOrders;
  }
}

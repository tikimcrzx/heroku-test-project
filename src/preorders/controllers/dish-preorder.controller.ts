import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { DishPreOrderService } from '../services/dish-preorder.service';
import { CreateDishPreOrderDTO } from '../input-dto';
import { Response } from 'express';

@Controller('dishpreorder')
export class DishPreOrderController {
  constructor(private readonly _dishPreOrderService: DishPreOrderService) {}

  @Post()
  async create(
    @Body() createDishPreOrderDto: CreateDishPreOrderDTO,
    @Res() res: Response,
  ) {
    const createdDishPreOrder = await this._dishPreOrderService.create(
      createDishPreOrderDto,
    );
    res.status(HttpStatus.OK).json(createdDishPreOrder);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Res() res: Response) {
    const dishPreOrder = await this._dishPreOrderService.update(id);
    res.status(HttpStatus.OK).json(dishPreOrder);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const dishesPreOrders = await this._dishPreOrderService.findAll();
    res.status(HttpStatus.CREATED).json(dishesPreOrders);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const dishPreOrder = await this._dishPreOrderService.findById(id);
    res.status(HttpStatus.OK).json(dishPreOrder);
  }
}

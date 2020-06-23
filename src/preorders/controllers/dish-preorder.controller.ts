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
import { IntentParameterDTO, ParameterOrderDTO } from '../../main/input-dto';

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

  @Post('order')
  async order(
    @Body() intentParameterDTO: IntentParameterDTO,
    @Res() res: Response,
  ) {
    const param = intentParameterDTO.queryResult
      .parameters as ParameterOrderDTO;

    console.log(param.Order);

    // const order = await this._dishPreOrderService.order(param.Order);
    res.status(HttpStatus.OK).json('OK');
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

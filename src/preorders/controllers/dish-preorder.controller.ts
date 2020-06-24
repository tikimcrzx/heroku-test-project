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
import { suggestionOrder } from '../utils/suggestion-card';

@Controller('dishpreorder')
export class DishPreOrderController {
  constructor(private readonly _dishPreOrderService: DishPreOrderService) {}

  @Post(':facebook')
  async facebook(
    @Param('facebook') facebook: string,
    @Body() intentParameterDto: IntentParameterDTO,
    @Res() res: Response,
  ) {
    let insert: { quantity: number; dish: string; status: boolean } = {
      quantity: 1,
      dish: facebook,
      status: false,
    };

    const exist = await this._dishPreOrderService.findDish(facebook);

    if (!exist) {
      insert.quantity = 1;
      insert.status = false;
      insert.dish = facebook;
    } else {
      insert.quantity = exist.quantity;
      insert.status = false;
      insert.dish = facebook;
    }

    const suggestion = await this._dishPreOrderService.order();

    await this._dishPreOrderService.create(insert);
    res.status(HttpStatus.OK).json(suggestion);
  }

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

  @Post('finish')
  async finish(@Res() res: Response) {
    const param = await this._dishPreOrderService.finish();
    res.status(HttpStatus.OK).json(param);
  }

  @Post('order')
  async order(
    @Body() intentParameterDTO: IntentParameterDTO,
    @Res() res: Response,
  ) {
    const param = intentParameterDTO.queryResult
      .parameters as ParameterOrderDTO;

    const order = await this._dishPreOrderService.order();
    res.status(HttpStatus.OK).json(order);
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

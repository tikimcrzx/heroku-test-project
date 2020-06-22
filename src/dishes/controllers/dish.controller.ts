import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Put,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { DishService } from '../services/dish.service';
import { Response } from 'express';
import { UpdateDishDTO, CreateDishDTO } from '../input-dto';
import { IntentParameterDTO, ParameterOrderDTO } from '../../main/input-dto';
import { DishPreOrderService } from '../../preorders/services/dish-preorder.service';
import { CreateDishPreOrderDTO } from '../../preorders/input-dto';

@Controller('dish')
export class DishController {
  constructor(private readonly _dishService: DishService) {}
  private readonly _dishPre: DishPreOrderService;

  @Get()
  async findAll(@Res() res: Response) {
    const dishes = await this._dishService.findAll();
    res.status(HttpStatus.OK).json(dishes);
  }

  @Post('order')
  async order(
    @Body() intentParameterDto: IntentParameterDTO,
    @Res() res: Response,
  ) {
    const param = intentParameterDto.queryResult
      .parameters as ParameterOrderDTO;
    const dish: any = await this._dishService.findOne(param.Order);
    const dishes: CreateDishPreOrderDTO = {
      quantity: null,
      dish: dish._id,
      status: false,
    };

    await this._dishPre.create(dishes);
    console.log(dish._id);
    res.status(HttpStatus.OK).json(dish);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const dish = await this._dishService.findById(id);
    res.status(HttpStatus.OK).json(dish);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDishDto: UpdateDishDTO,
    @Res() res: Response,
  ) {
    const updatedDish = await this._dishService.update(id, updateDishDto);
    res.status(HttpStatus.OK).json(updatedDish);
  }

  @Post()
  async create(@Body() createDishDto: CreateDishDTO, @Res() res: Response) {
    const createdDish = await this._dishService.create(createDishDto);
    res.status(HttpStatus.CREATED).json(createdDish);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const deletedDish = await this._dishService.delete(id);
    res.status(HttpStatus.OK).json(deletedDish);
  }
}

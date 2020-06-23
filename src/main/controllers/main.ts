import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { IntentParameterDTO } from '../input-dto';
import { Response } from 'express';
import { Intents } from '../enums/intents.enum';
import { URLs } from '../enums/url.enum';

@Controller('main')
export class MainController {
  @Post()
  async main(
    @Body() intentParameterDto: IntentParameterDTO,
    @Res() res: Response,
  ) {
    let url = '';
    const displayName = intentParameterDto.queryResult.intent.displayName;

    if (displayName === Intents.RESTAURANT_MENU) {
      url = URLs.MENU;
    } else if (displayName === Intents.RESTAURANT_ORDER) {
      url = URLs.ORDER;
    } else if (displayName === Intents.REPIT_ORDER) {
      // url = R
    }

    res.redirect(HttpStatus.TEMPORARY_REDIRECT, url);
  }
}

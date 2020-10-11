import { Controller, Get, Post, Render, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Label } from './model/label'


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  @Render('index')
  root() {
    return { header: 'Label System' };
  }

  @Post()
  receiveLabel(@Request() req){
    let label = new Label()
    label.serialNumber = req.body.serialNumber
    label.quantity = Math.floor(Math.random() * 10)
    this.appService.addLabel(label)
    return label
  }

}

import { Injectable } from '@nestjs/common';
import { Label } from './model/label';


let labels = [{serialNumber: '6427', quantity:5}]


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  addLabel(label) : Label[] {
    labels.push(label)
    return labels
  }

  deleteLabel(label) {
    let indexToDelete = labels.findIndex((element)=> element.serialNumber === label.serialNumber)
    labels.splice(indexToDelete,1)
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name: 'getWarnsQuantity'
})

export class WarnsQuantity implements PipeTransform {
  transform(arr: Array<any>) : number {
    return arr.length;
  }
}

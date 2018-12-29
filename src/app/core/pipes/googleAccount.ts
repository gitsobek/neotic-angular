import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name: 'isGoogleAccount'
})

export class GoogleAccountPipe implements PipeTransform {
   transform(val: string) : string {
      if(val == '' || !val) {
        return 'NIE'
      } else {
        return 'TAK'
      }
   }
}

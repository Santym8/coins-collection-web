import { Pipe, PipeTransform } from '@angular/core';
import { Coin } from '../../models/Coin';

@Pipe({
  name: 'foundFilter',
  standalone: true
})
export class FoundFilterPipe implements PipeTransform {

  transform(coins: Coin[], foundFilter: ('found' | 'notFound')[]): Coin[] {
    return coins.filter(
      coin => foundFilter.includes(coin.found ? 'found' : 'notFound')
    );
  }
}

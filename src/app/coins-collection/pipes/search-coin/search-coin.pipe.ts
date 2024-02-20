import { Pipe, PipeTransform } from '@angular/core';
import { Coin } from '../../models/Coin';

@Pipe({
  name: 'searchCoin',
  standalone: true
})
export class SearchCoinPipe implements PipeTransform {

  transform(value: Coin[], search: string): Coin[] {
    return value.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
      || coin.year.toString().includes(search)
    );
  }

}

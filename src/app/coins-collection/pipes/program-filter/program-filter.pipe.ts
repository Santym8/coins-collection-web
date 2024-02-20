import { Pipe, PipeTransform } from '@angular/core';
import { Coin } from '../../models/Coin';

@Pipe({
  name: 'programFilter',
  standalone: true
})
export class ProgramFilterPipe implements PipeTransform {

  transform(value: Coin[], programsFilter: string[]): Coin[] {

    // Firtst time programsFilter is empty util API returns the programs so we need to return all the coins
    if (programsFilter.length === 1 && programsFilter[0] === "-1") return value;

    return value.filter((coin: Coin) => {
      return programsFilter.includes(coin.program);
    });
  }

}

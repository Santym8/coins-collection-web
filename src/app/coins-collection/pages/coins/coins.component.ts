import { Component } from '@angular/core';
import { CoinCardComponent } from '../../components/coin-card/coin-card.component';
import { CommonModule } from '@angular/common';
import { Coin } from '../../models/Coin';

@Component({
  selector: 'app-coins',
  standalone: true,
  imports: [CoinCardComponent, CommonModule],
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.css'
})
export class CoinsComponent {

  coinFound: Coin = {
    id: '65cc0dc5c7b83b7c22134fe7',
    program: '621ea811cee5982b1c89109e',
    coinNumber: 1,
    name: 'Maya Angelou',
    year: 2022,
    image: 'https://www.usmint.gov/wordpress/wp-content/uploads/2021/12/2022-american-women-quarters-coin-maya-angelou-uncirculated-reverse-300x300.jpg',
    status: false
  };

  coinNotFound: Coin = {
    id: '65cc0dc5c7b83b7c22134fe7',
    program: '621ea811cee5982b1c89109e',
    coinNumber: 1,
    name: 'Maya Angelou',
    year: 2022,
    image: 'https://www.usmint.gov/wordpress/wp-content/uploads/2021/12/2022-american-women-quarters-coin-maya-angelou-uncirculated-reverse-300x300.jpg',
    status: true
  };
}

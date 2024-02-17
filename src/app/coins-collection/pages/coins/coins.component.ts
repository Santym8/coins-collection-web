import { Component } from '@angular/core';
import { CoinCardComponent } from '../../components/coin-card/coin-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coins',
  standalone: true,
  imports: [CoinCardComponent, CommonModule],
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.css'
})
export class CoinsComponent {

  
}

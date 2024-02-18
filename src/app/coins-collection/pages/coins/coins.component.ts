import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoinCardComponent } from '../../components/coin-card/coin-card.component';
import { CommonModule } from '@angular/common';
import { Coin } from '../../models/Coin';
import { StorageService } from '../../../_shared/services/storage/storage.service';
import { Subscription } from 'rxjs';
import { CoinService } from '../../services/coins/coins.service';

@Component({
  selector: 'app-coins',
  standalone: true,
  imports: [CoinCardComponent, CommonModule],
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.css'
})
export class CoinsComponent implements OnDestroy, OnInit {
  constructor(
    private storageService: StorageService,
    private coinService: CoinService
  ) { }

  userLoggedIn: boolean = null!;
  private loginStatusSubscription: Subscription = null!;
  coins: Coin[] = [];


  ngOnInit(): void {
    this.loginStatusSubscription = this.storageService.getLoggedInStatus().subscribe((status) => {
      this.userLoggedIn = status;
    });

    this.coinService.getCoins().subscribe({
      next: data => {
        this.coins = data as any as Coin[];
      },
      error: (error) => {
        console.error(error);
      }

    });

  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoinCardComponent } from '../../components/coin-card/coin-card.component';
import { CommonModule } from '@angular/common';
import { Coin } from '../../models/Coin';
import { StorageService } from '../../../_shared/services/storage/storage.service';
import { Subscription } from 'rxjs';
import { CoinService } from '../../services/coins/coins.service';
import { CoinsCollectorService } from '../../services/coins-collector/coins-collector.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private coinService: CoinService,
    private coinsCollectorService: CoinsCollectorService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  userLoggedIn: boolean = null!;
  private loginStatusSubscription: Subscription = null!;
  coins: Coin[] = [];


  ngOnInit(): void {
    this.getLoginStatusHandler();
    this.getCoinsHandler();
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }



  private getLoginStatusHandler() {
    this.loginStatusSubscription = this.storageService.getLoggedInStatus().subscribe((status) => {
      this.userLoggedIn = status;
    });
  }

  private getCoinsHandler() {

    if (!this.userLoggedIn) {
      this.coinService.getCoins().subscribe({
        next: data => {
          this.coins = data as any as Coin[];
        },
        error: (error) => {
          this.router.navigate(['/home']);
          this.toastr.error("We are having problems", 'Error', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
        }
      });
      return;
    }

    const token = this.storageService.getUserToken();
    console.log(token);
    if (token === null) {
      this.router.navigate(['/home']);
      this.toastr.error("We are having problems", 'Error', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
      return;
    }

    this.coinsCollectorService.getCoinsCollector(token).subscribe({
      next: data => {
        this.coins = data as any as Coin[];
      },
      error: (error) => {
        this.router.navigate(['/home']);
        this.toastr.error("We are having problems", 'Error', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
      }
    });


  }
}

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
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-coins',
  standalone: true,
  imports: [CoinCardComponent, FontAwesomeModule],
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.css'
})
export class CoinsComponent {
  constructor(
    private storageService: StorageService,
    private coinService: CoinService,
    private coinsCollectorService: CoinsCollectorService,
    private router: Router,
    private toastr: ToastrService,
    private library: FaIconLibrary,

  ) {
    library.addIcons(faSpinner);

  }

  loadingCards: boolean = true;
  userLoggedIn: boolean = null!;
  coins: Coin[] = [];


  ngOnInit(): void {
    this.loadingCards = true;
    this.userLoggedIn = this.storageService.isLoggedIn();
    this.getCoinsHandler();
  }


  private getCoinsHandler() {

    if (!this.userLoggedIn) {
      this.coinService.getCoins().subscribe({
        next: data => {
          this.coins = data as any as Coin[];
          this.loadingCards = false;
        },
        error: (error) => {
          this.router.navigate(['/home']);
          this.toastr.error("We are having problems", 'Error', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
        }
      });
      return;
    }

    const token = this.storageService.getUserToken();
    if (token === null) {
      this.router.navigate(['/home']);
      this.toastr.error("We are having problems", 'Error', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
      return;
    }

    this.coinsCollectorService.getCoinsCollector(token).subscribe({
      next: data => {
        this.coins = data as any as Coin[];
        this.loadingCards = false;
      },
      error: (error) => {
        if (error.status === 401) {
          this.storageService.clean();
          this.toastr.warning("Your session has expired", 'Login', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
          return;
        }
        this.router.navigate(['/home']);
        this.toastr.error("We are having problems", 'Error', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
      }
    });


  }
}

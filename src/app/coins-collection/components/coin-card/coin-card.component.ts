import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { StorageService } from '../../../_shared/services/storage/storage.service';
import { Coin } from '../../models/Coin';
import { Subscription } from 'rxjs';
import { CoinsCollectorService } from '../../services/coins-collector/coins-collector.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-coin-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coin-card.component.html',
  styleUrl: './coin-card.component.css'
})
export class CoinCardComponent {

  constructor(
    private storageService: StorageService,
    private coinsCollectorService: CoinsCollectorService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  userLoggedIn: boolean = null!;
  // private loginStatusSubscription: Subscription = null!;

  @Input('coin') coin: Coin = null!;
  @Output() coinChange = new EventEmitter<Coin>();

  ngOnInit(): void {
    // this.loginStatusSubscription = this.storageService.getLoggedInStatus().subscribe((status) => {
    //   this.userLoggedIn = status;
    // });
    this.userLoggedIn = this.storageService.isLoggedIn();
  }

  // ngOnDestroy() {
  //   if (this.loginStatusSubscription) {
  //     this.loginStatusSubscription.unsubscribe();
  //   }
  // }


  onClickHandler() {
    const token = this.storageService.getUserToken();

    if (!token) {
      this.router.navigate(['/login']);
      this.toastr.error('You need to login to add coins to your collection', 'Error', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
      return;
    }

    this.coinsCollectorService.addDeleteCoinCollector(token, this.coin._id).subscribe(
      {
        next: () => {
          this.toastr.success('Action completed successfully', 'Success', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
          this.coin.found = !this.coin.found;
          this.coinChange.emit(this.coin);
        },
        error: (err) => {
          if (err.status === 401) {
            this.storageService.clean();
            this.toastr.warning("Your session has expired", 'Login', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
            return;
          }

          this.toastr.error('Error adding coin to your collection', 'Error', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
        }
      }
    );
    return;
  }
}

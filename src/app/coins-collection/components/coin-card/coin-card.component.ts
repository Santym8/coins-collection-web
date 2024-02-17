import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from '../../../_shared/services/storage/storage.service';
import { Coin } from '../../models/Coin';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coin-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coin-card.component.html',
  styleUrl: './coin-card.component.css'
})
export class CoinCardComponent implements OnDestroy, OnInit {

  constructor(private storageService: StorageService) { }

  userLoggedIn: boolean = null!;
  private loginStatusSubscription: Subscription = null!;

  @Input('coin') coin: Coin = null!;

  ngOnInit(): void {
    this.loginStatusSubscription = this.storageService.getLoggedInStatus().subscribe((status) => {
      this.userLoggedIn = status;
    });
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }
}

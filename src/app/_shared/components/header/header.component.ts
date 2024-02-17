import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {

  constructor(
    private storage: StorageService,
    private router: Router
  ) {
    this.loginStatusSubscription = this.storage.getLoggedInStatus().subscribe((status) => {
      this.userLoggedIn = status;
    });
  }

  icons = {
    logout: faArrowRightFromBracket,
    user: faUser,
  };

  userLoggedIn: boolean = false;
  private loginStatusSubscription: Subscription;


  logout() {
    this.storage.clean();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }
}

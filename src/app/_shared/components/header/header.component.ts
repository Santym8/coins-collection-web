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
export class HeaderComponent implements OnDestroy, OnInit {

  constructor(
    private storage: StorageService,
    public router: Router
  ) { }

  icons = {
    logout: faArrowRightFromBracket,
    user: faUser,
  };

  userLoggedIn: boolean = null!;
  private loginStatusSubscription: Subscription = null!;

  ngOnInit(): void {
    this.loginStatusSubscription = this.storage.getLoggedInStatus().subscribe((status) => {
      this.userLoggedIn = status;
    });
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }


  logoutHandler() {
    this.storage.clean();
    this.router.navigate(['/']);
  }

}

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private loggedInStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = window.sessionStorage.getItem(USER_KEY);
      return !!user;
    }
    return false;
  }

  private updateLoginStatus(): void {
    this.loggedInStatus.next(this.isLoggedIn());
  }

  public clean(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.clear();
      this.updateLoginStatus();
    }
  }

  public saveUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      this.updateLoginStatus();
    }
  }

  public getLoggedInStatus() {
    return this.loggedInStatus.asObservable();
  }
}

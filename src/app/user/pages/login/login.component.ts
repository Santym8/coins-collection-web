import { Component } from '@angular/core';
import { LoginForm } from '../models/LoginForm';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { StorageService } from '../../../_shared/services/storage/storage.service';
import { ApiErrorResponse } from '../../../_shared/dto/ApiErrorResponse';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private library: FaIconLibrary,
    private storageService: StorageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    library.addIcons(faSpinner);
  }

  isLoading: boolean = false;
  errorMessage: string = '';

  loginForm: LoginForm = {
    username: 'test',
    password: 'passwords'
  };

  onLogin() {
    this.isLoading = true;
    this.authService.login(this.loginForm.username, this.loginForm.password).subscribe(
      {
        next: data => {
          this.storageService.saveUser(data);
          this.isLoading = false;
          this.router.navigate(['/coins-collection']);
        },
        error: err => {
          const apiError: ApiErrorResponse = err.error;
          if (apiError.statusCode === 500) {
            this.errorMessage = 'Server error';
          }
          else {
            this.errorMessage = apiError.message;
          }
          this.isLoading = false;
          this.toastr.error(this.errorMessage, 'Error', { timeOut: 3000, closeButton: true, positionClass: 'toast-top-center' });
        }
      }
    );
  }


}

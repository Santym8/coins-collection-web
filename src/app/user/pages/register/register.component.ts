import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { RegisterForm } from '../models/RegisterForm';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { StorageService } from '../../../_shared/services/storage/storage.service';
import { ApiErrorResponse } from '../../../_shared/dto/ApiErrorResponse';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private library: FaIconLibrary,
    private storageService: StorageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    library.addIcons(faSpinner);
  }


  registerForm: RegisterForm = {
    username: 'test',
    email: 'test@test.com',
    password: 'password'
  };

  isLoading: boolean = false;
  errorMessage: string = '';


  onRegister() {
    this.isLoading = true;
    this.authService.register(this.registerForm.username, this.registerForm.email, this.registerForm.password).subscribe(
      {
        next: data => {
          this.storageService.saveUser(data);
          this.isLoading = false;
          this.router.navigate(['/']);
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

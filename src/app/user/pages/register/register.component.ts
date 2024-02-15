import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { RegisterForm } from '../models/RegisterForm';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: RegisterForm = {
    username: 'test',
    email: 'test@test.com',
    password: 'password'
  };

  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private library: FaIconLibrary
  ) {
    library.addIcons(faSpinner);
  }


  onRegister() {
    this.isLoading = true;
    this.authService.register(this.registerForm.username, this.registerForm.email, this.registerForm.password).subscribe(
      {
        next: data => {
          // TODO - Login user
        },
        error: err => {
          console.log(err)
        }
      }
    );
  }
}

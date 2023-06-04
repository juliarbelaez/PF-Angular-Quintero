import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthServiceService,
  LoginFormValue,
} from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword = true;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private authService: AuthServiceService) {}
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value as LoginFormValue);
    }
  }
}

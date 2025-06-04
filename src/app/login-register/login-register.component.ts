import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css',
})
export class LoginRegisterComponent {
  showLoginForm: boolean = true;
  loginCaptcha: string = this.generateCaptcha();
  registerCaptcha: string = this.generateCaptcha();

  loginData = {
    username: '',
    password: '',
    captcha: '',
  };

  registerData = {
    name: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    confirmPassword: '',
    captcha: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  toggleForms(event: Event) {
    event.preventDefault();
    this.showLoginForm = !this.showLoginForm;
    // Generate new captchas when switching forms
    this.loginCaptcha = this.generateCaptcha();
    this.registerCaptcha = this.generateCaptcha();
  }

  private generateCaptcha(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  onRegisterSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (this.registerData.captcha !== this.registerCaptcha) {
      alert('Invalid captcha!');
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: (res) => {
        alert(res.message);
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert(err.error.message || 'Registration failed');
      },
    });
  }

  onLoginSubmit() {
    this.loginData.captcha= this.loginCaptcha;
    if (this.loginData.captcha !== this.loginCaptcha) {
      alert('Invalid captcha!');
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem('userId', res.userId);
        alert("Welcome Back! " + this.loginData.username);
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert(err.error.message || 'Login failed');
      },
    });
  }
}

// localhost\MSSQLSERVER01

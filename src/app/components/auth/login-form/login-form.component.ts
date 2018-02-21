import { Component } from '@angular/core';
import { LoginModel } from '../../../core/models/login.model';
import { AuthenticationService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  public model: LoginModel;
  public loginFail: boolean;
  public username: string;

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.model = new LoginModel('', '');
    this.username = '';
  }


  login(): void {
    this.authService.login(this.model)
      .subscribe(
      data => {
        this.successfulLogin(data);
      },
      err => {
        this.loginFail = true;
        this.toastr.error('Incorrect username or password.');
      }
      );
  }

  get diagnostics(): string {
    return JSON.stringify(this.model);
  }

  successfulLogin(data): void {
    this.authService.authtoken = data['_kmd']['authtoken'];
    this.authService.role = data['role'];
    console.log(this.authService.role);
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    localStorage.setItem('role', data['role']);
    localStorage.setItem('id', data['_id']);
    this.loginFail = false;
    this.toastr.success(`Successfull login ${data.username}`);
    this.router.navigate(['/home']);
  }
}

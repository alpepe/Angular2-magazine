import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../../core/models/register.model';
import { AuthenticationService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  public model: RegisterModel;
  public registeredUser: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) {
    this.model = new RegisterModel("", "", "", "", "", "user", []);
  }

  register(): void {
    this.authService.register(this.model)
      .subscribe(
      data => {
        this.successfulRegister(data);
      },
      err => {
        // this.registerFail = true;
        this.toastr.error('User already exists!');
      }
      );
  }

  get diagnostics(): string {
    return JSON.stringify(this.model);
  }

  successfulRegister(data): void {
    // this.registerSuccess = true;
    this.registeredUser = data['username'];
    this.toastr.success('Successfull Registered. Now logIn');
    this.router.navigate(['/login']);
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRequestInterface } from '@interfaces/food.interface';
import { Store } from '@ngrx/store';
import { FoodService } from '@services/Food.service';
import { loginAndLogout } from '@store/actions/food.actions';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './LoginForm.component.html',
})
export class LoginFormComponent {
  profileForm;

  emailFromLocalStorage!: string | null;
  passwordFromLocalStorage!: string | null;
  isCheckedFromLocalStorage!: boolean | null;

  loginService = inject(FoodService);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ isLogin: { isLogin: boolean } }>
  ) {
    this.emailFromLocalStorage = localStorage.getItem('email');
    this.passwordFromLocalStorage = localStorage.getItem('password');
    this.isCheckedFromLocalStorage =
      localStorage.getItem('isChecked') === 'true' ? true : false;

    this.profileForm = this.formBuilder.group({
      email: [
        this.emailFromLocalStorage,
        [Validators.required, Validators.email],
      ],
      password: [this.passwordFromLocalStorage, Validators.required],
      isCheckedRemember: [this.isCheckedFromLocalStorage],
    });
  }

  login() {
    if (
      this.profileForm.valid /*  &&
      
      this.profileForm.controls.email.value === 'darwin@gmail.com' &&
      this.profileForm.controls.password.value === '123' */
    ) {
      this.loginService
        .login(this.profileForm.value as LoginRequestInterface)
        .subscribe({
          next: (userData) => {
            console.log(userData, 'User data');
          },
          error: (errorData) => {
            console.error(errorData);
          },
          complete: () => {
            console.info('Login complete');
            this.store.dispatch(loginAndLogout());
          },
        });

      const formsValue = this.profileForm.value;

      if (
        formsValue.isCheckedRemember === true &&
        formsValue.email &&
        formsValue.password
      ) {
        localStorage.setItem('email', formsValue.email);
        localStorage.setItem('password', formsValue.password);
        localStorage.setItem(
          'isChecked',
          formsValue.isCheckedRemember.toString()
        );
      }else{
        localStorage.removeItem("email")
        localStorage.removeItem("password")
        localStorage.removeItem("isChecked")

      }
      this.profileForm.reset();
    } else {
      this.profileForm.markAllAsTouched();
      alert('Error al ingresar los datos');
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Store } from '@ngrx/store';
import { LoginFormComponent } from '@components/LoginForm/LoginForm.component';
import { loginAndLogout } from '@store/actions/food.actions';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './LoginModal.component.html',
})
export class LoginModalComponent {
  islogin$!: boolean;

  constructor(private store: Store<{ isLogin: { isLogin: boolean } }>) {
    store.select('isLogin').subscribe((loginState: { isLogin: boolean }) => {
      this.islogin$ = loginState.isLogin;
    });
  }

  logout(){
    this.store.dispatch(loginAndLogout())
  }

  ngOnInit(): void {
    initFlowbite();
  }
}

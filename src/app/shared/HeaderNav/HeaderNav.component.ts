import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginModalComponent } from '@components/LoginModal/LoginModal.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [CommonModule, LoginModalComponent],
  templateUrl: './HeaderNav.component.html',
})
export class HeaderNavComponent {
  islogin$!: boolean;

  constructor(private store: Store<{ isLogin: { isLogin: boolean } }>) {
    store.select('isLogin').subscribe((loginState: { isLogin: boolean }) => {
      this.islogin$ = loginState.isLogin;
    });
  }
}

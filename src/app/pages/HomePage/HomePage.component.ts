import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderNavComponent } from '@shared/HeaderNav/HeaderNav.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '@components/Menu/Menu.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeaderNavComponent, RouterModule, MenuComponent],
  templateUrl: './HomePage.component.html',
})
export default class HomePageComponent {}

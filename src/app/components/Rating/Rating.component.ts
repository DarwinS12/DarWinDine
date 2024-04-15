import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Rating.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class RatingComponent { }

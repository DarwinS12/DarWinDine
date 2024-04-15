import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-to',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ButtonTo.component.html',
})
export class ButtonToComponent {
  @Input({ required: true }) pathTo!: string;
}

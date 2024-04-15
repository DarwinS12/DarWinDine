import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prodcuts-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ProdcutsImage.component.html',
})
export class ProdcutsImageComponent {
  @Input({ required: true }) src!: string | undefined;
  @Input() stylesImg1!: string;
  @Input() stylesImg2!: string;

}

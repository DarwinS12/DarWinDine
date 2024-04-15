import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-type-food-menu-card',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterModule],
  templateUrl: './TypeFoodMenuCard.component.html',
})
export class TypeFoodMenuCardComponent {
  @Input({ required: true }) typeOfFood!: string;

  @Input() toPage!: string

  @Input({ required: true }) cardColor!: string;

  articleTitle!: string;

  ngOnInit() {
    this.articleTitle = this.typeOfFood;
  }

  onMouseEnter() {
    this.articleTitle = 'See All';
  }

  onMouseLeave() {
    this.articleTitle = this.typeOfFood;
  }
}

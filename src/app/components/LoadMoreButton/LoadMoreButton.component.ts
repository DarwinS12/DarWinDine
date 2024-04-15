import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadMore } from '@store/actions/food.actions';

@Component({
  selector: 'app-load-more-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './LoadMoreButton.component.html',
})
export class LoadMoreButtonComponent {
  constructor(private store: Store<{}>) {}

  loadMoreProducts() {
    this.store.dispatch(loadMore());
  }
}

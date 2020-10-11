import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient [];
  private igChangeSub: Subscription;

  constructor(private slService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub =  this.slService.ingredientsChanged.subscribe( (x: Ingredient []) => {
          this.ingredients = x;
    });

    this.loggingService.pringLog('Hello From shopping list component ngOnInit()');
  }

  onEditItem( index: number) {
    this.slService.startedEditing.next(index);
  }

   ngOnDestroy() {
    this.igChangeSub.unsubscribe();
   }
}

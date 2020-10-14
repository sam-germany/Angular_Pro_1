import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions33 from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

   @ViewChild('f1' , {static: true}) slForm: NgForm;
   subscription: Subscription;
   editMode= false;
   editedItemIndex: number;
   editedItem: Ingredient;

  constructor(private slService: ShoppingListService, private store33: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
   this.subscription =  this.slService.startedEditing.subscribe(
     (index: number) => {
       this.editedItemIndex = index;
       this.editMode = true;
       this.editedItem = this.slService.getIngredient(index);
       this.slForm.setValue({
         name22: this.editedItem.name,
         amount22: this.editedItem.amount
       })
     }
   );
  }

  onSubmit(form22: NgForm) {
    const value = form22.value;
    const newIngredient = new Ingredient(value.name22, value.amount22);

    if (this.editMode) {
   //   this.slService.updateIngredient(this.editedItemIndex, newIngredient);

      this.store33.dispatch(     new ShoppingListActions33.UpdateIngrident({
                                                                                 index: this.editedItemIndex,
                                                                                 ingredient: newIngredient    })
                    );
    } else {
    //  this.slService.addIngredient(newIngredient);

      this.store33.dispatch(new ShoppingListActions33.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form22.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
   // this.slService.deleteIngredient(this.editedItemIndex);

   this.store33.dispatch(new ShoppingListActions33.DeleteIngrident(this.editedItemIndex));
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

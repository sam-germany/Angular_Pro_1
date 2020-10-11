import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

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

  constructor(private slService: ShoppingListService) { }

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
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form22.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

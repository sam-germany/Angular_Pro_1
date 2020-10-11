import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ShoppingListService {
  ingredientsChanged  = new Subject<Ingredient []>();
  startedEditing = new Subject<number>();

 private ingredients: Ingredient [] = [
    new Ingredient('Apples', 4),
    new Ingredient('Tomatos', 7)
  ];



  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addMultipleIngredients(x6: Ingredient []) {
      /*  for( let x6 of ingredients) {    // for single element on by one
          this.addIngredient(x6);
        }*/

    this.ingredients.push(...x6);        // with the   ...   three dot  spread operator we can push all the elements in one shot
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}


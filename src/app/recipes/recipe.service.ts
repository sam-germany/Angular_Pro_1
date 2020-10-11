import {Recipe} from './recipe.modal';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) { }

/* private  recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel', 'Super Recipe', 'https://picsum.photos/seed/picsum/200/300',[
                                              new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),

    new Recipe('Big Fat Burger', 'Best Recipe', 'https://picsum.photos/seed/picsum/200/300',[
                                              new Ingredient('Extra Squse', 1), new Ingredient('Maynese',3)])
  ];*/

  private recipes: Recipe[] = [];

  recipeSelected = new Subject<Recipe>();


  setRecipes(recipes: Recipe []) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

   getRecipes() {
     return this.recipes.slice();
   }

   getRecipe(idd: number) {
     return this.recipes[idd];
   }


   addIngredientsToShoppingList(x6: Ingredient[]) {
     this.slService.addMultipleIngredients(x6);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
     this.recipes[index] = updatedRecipe;
  }

  deleteRecipe(index: number) {
     this.recipes.splice(index, 1);
     this.recipesChanged.next(this.recipes.slice());
  }
}

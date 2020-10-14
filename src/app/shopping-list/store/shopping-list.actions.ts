import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';


export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';



export class AddIngredient implements  Action {
  readonly  type = ADD_INGREDIENT;
  constructor( public payload22: Ingredient ) { }

}


export class AddIngredients  implements  Action {
  readonly  type = ADD_INGREDIENTS;
  constructor( public payload33: Ingredient []) { }
}


export class UpdateIngrident  implements  Action {
  readonly  type = UPDATE_INGREDIENT;
  constructor( public payload44: {index: number, ingredient: Ingredient}) { }
}

export class DeleteIngrident  implements  Action {
  readonly  type = DELETE_INGREDIENT;
  constructor( public payload55: number ) { }
}

export class StartEdit implements  Action {
  readonly  type = START_EDIT;
  constructor( public payload66: number ) { }
}

export class StopEdit implements  Action {
  readonly  type = STOP_EDIT;
}

export type ShoppingListActions11 = AddIngredient | AddIngredients | UpdateIngrident | DeleteIngrident | StartEdit | StopEdit;

import {Ingredient} from '../../shared/ingredient.model';
import {Action} from '@ngrx/store';
import * as ShoppingListActions22 from './shopping-list.actions';



export interface State11 {
  ingredients: Ingredient [];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State11;
}


const initialState: State11  =  {
    ingredients: [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatos',10)
    ],
  editedIngredient: null,
  editedIngredientIndex: -1
};



export function  shoppingListReducer(state: State11 = initialState,
                                                     action22: ShoppingListActions22.ShoppingListActions11) {

  switch (action22.type) {
    case ShoppingListActions22.ADD_INGREDIENT : return {
                                                   ...state,
                                                   ingredients: [...state.ingredients, action22.payload22]
                                                  };

    case ShoppingListActions22.ADD_INGREDIENTS :  return {
                                                        ...state,
                                                  ingredients: [...state.ingredients, ...action22.payload33 ]
                                                  };

    case ShoppingListActions22.UPDATE_INGREDIENT:  const ingredient44 = state.ingredients[action22.payload44.index];
                                                   const updatedIngredient = {  ...ingredient44,  ...action22.payload44.ingredient};
                                                   const updatedIngredients = [...state.ingredients];
                                                   updatedIngredients[action22.payload44.index] = updatedIngredient;

                                                  return {
                                                  ...state,
                                                  ingredients: updatedIngredients
                                                  };

    case ShoppingListActions22.DELETE_INGREDIENT:

      return {
        ...state,
        ingredients:  state.ingredients.filter((ing, ingredient_Index) => {
          return  ingredient_Index !== action22.payload55;
        })
      };

    case ShoppingListActions22.START_EDIT:   return {
                                                   ...state,
                                                   editedIngredientIndex: action22.payload66,
                                                   editedIngredient: state.ingredients[action22.payload66]
                                                   };




    case ShoppingListActions22.STOP_EDIT:



    default: return state;
  };
}

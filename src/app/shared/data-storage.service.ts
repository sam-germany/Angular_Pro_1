import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.modal';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService  {


  constructor(private http22: HttpClient, private recipeService: RecipeService,
              private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http22
      .put('https://ng-course-recipe-book-a6735.firebaseio.com/recipes.json', recipes)
      .subscribe( response => {
        console.log(response);
      });
  }

  fetchRecipes() {
        return    this.http22.get<Recipe[]>('https://ng-course-recipe-book-a6735.firebaseio.com/recipes.json'

        ).pipe(
          map(recipes => {
           return recipes.map( recipe => {
             return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
           });
         }),
           tap(recipes => {
             this.recipeService.setRecipes(recipes);
           })
         );
  }


}

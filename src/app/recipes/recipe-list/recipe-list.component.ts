import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.modal';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy{

   recipes: Recipe [];
   subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.subscription = this.recipeService.recipesChanged
      .subscribe( (recipes77: Recipe[]) => {
        this.recipes = recipes77;
      });

    this.recipes = this.recipeService.getRecipes();
    console.log(this.route);
  }



  onNewRecipe() {

    this.router.navigate(['new'], {relativeTo: this.route});
    console.log(this.route);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.modal';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    x3: Recipe;
    id: number;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((p: Params) => {
      this.id = +p['id'];
      this.x3 = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
      this.recipeService.addIngredientsToShoppingList(this.x3.ingredients);
  }

  onEditRecipe() {
       this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}

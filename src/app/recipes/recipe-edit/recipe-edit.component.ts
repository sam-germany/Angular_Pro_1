import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import validate = WebAssembly.validate;
import {Recipe} from '../recipe.modal';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
   id: number;
   editMode = false;
   recipeForm22: FormGroup;

   constructor(private route: ActivatedRoute,
               private recipeService: RecipeService,
               private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (p: Params)=> {
              this.id = +p['id'];
              this.editMode = p['id'] != null;
              this.initForm22();
    });
  }

  onSubmit() {
     const newRecipe66 = new Recipe(this.recipeForm22.value['name22'],
                                  this.recipeForm22.value['description22'],
                                  this.recipeForm22.value['imagePath22'],
                                  this.recipeForm22.value['ingredients22']);

     if (this.editMode) {
       this.recipeService.updateRecipe(this.id, newRecipe66);
     }else{
       this.recipeService.addRecipe(newRecipe66);
     }
     this.onCancle();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm22.get('ingredients22'))
      .push( new FormGroup({
         'name22': new FormControl(null, Validators.required),
        'amount22': new FormControl(null, [
          Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
      );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm22.get('ingredients22')).removeAt(index);
  }

  onCancle() {
     this.router.navigate(['../'], {relativeTo: this.route})
  }

  private initForm22() {
     let recipeName = '';
     let recipeImagePath = '';
     let recipeDescription = '';
     let recipeIngredients = new FormArray([]);

     if(this.editMode) {
       const rr = this.recipeService.getRecipe(this.id);
       console.log(rr);
       recipeName = rr.name;
       recipeImagePath = rr.imagePath;
       recipeDescription  = rr.description;
       if(rr['ingredients']) {
         for (let x of rr.ingredients) {
           recipeIngredients.push( new FormGroup({
             'name22': new FormControl(x.name , Validators.required),
             'amount22': new FormControl(x.amount, [
                                Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
           }));
         }
       }
     }

    this.recipeForm22 = new FormGroup({
        'name22': new FormControl(recipeName, Validators.required),
        'imagePath22': new FormControl(recipeImagePath, Validators.required),
        'description22': new FormControl(recipeDescription, Validators.required),
        'ingredients22': recipeIngredients
      }
    );
  }


  get controls() { // a getter!

    return (<FormArray>this.recipeForm22.get('ingredients22')).controls;
   }



}

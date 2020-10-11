import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData22, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent  implements OnDestroy{

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost22: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }


  onSwitchMode() {
     this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form22: NgForm) {
    if (!form22.valid) {  return;  }

    const email = form22.value.email;
    const password = form22.value.password;


    let authObs: Observable<AuthResponseData22>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login22(email, password);
    } else {
      authObs = this.authService.signup22(email, password);

    }
    authObs.subscribe(resData => {
                      console.log(resData);
                         this.isLoading = false;
                         this.router.navigate(['/recipes']);
                             },
                      errorMessage => {
                           console.log(errorMessage);
                           this.error = errorMessage;
                           this.showErrorAlert22(errorMessage);
                           this.isLoading = false;
                 });

    form22.reset();
  }

  onHandleError22() {
    this.error = null;
  }

  ngOnDestroy() {
    if(this.closeSub) {
       this.closeSub.unsubscribe();
    }
      }

   private showErrorAlert22(message11: string) {
 //   const alertCmp = new AlertComponent();

   const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

   const hostViewContainerRef33 = this.alertHost22.viewContainerRef22;
   hostViewContainerRef33.clear();

   const componentRef33 =  hostViewContainerRef33.createComponent(alertCmpFactory);

   componentRef33.instance.message22 = message11;
   this.closeSub=   componentRef33.instance.close22.subscribe(() => {

     this.closeSub.unsubscribe();
     hostViewContainerRef33.clear();
   });
  }



}

import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef: ElementRef) { }

  @HostBinding('class.open') isOpen2 = false;

   /*@HostListener('click') toggleOpen22() {  // Note: this is only for close or open the dropdown only from
     this.isOpen2 = !this.isOpen2;            // the menu Button
   }*/


  @HostListener('document:click',['$event']) toggleOpen22( event2: Event){
    console.log(this.elRef.nativeElement.contains(event2.target)  +'---');
    this.isOpen2 = this.elRef.nativeElement.contains(event2.target) ? !this.isOpen2: false;
  }



/* this  HostListener i have create after opening the dropdown, if we click anywhere then it will close
the dropdown menu, main point this @HostListener make    isOpen2 = false

  this.elRef.nativeElement.contains(event2.target)     <-- it return always  "true"  as the .contains() method

  has a Event and it is triggered so we click many times  but always  in teranery operator   !this.isOpen2     will

  be executed and it changes the boolean value always, the confusing part is that  : false; will never be executed
  in teranery operator.








*/




}

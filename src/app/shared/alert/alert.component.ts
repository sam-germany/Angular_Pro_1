import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls:  ['./alert.component.css']
})
export class AlertComponent {

 @Input() message22: string;
 @Output() close22 = new EventEmitter<void>();

 onClose() {
   this.close22.emit();
 }

}

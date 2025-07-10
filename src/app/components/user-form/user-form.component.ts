import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { user } from '../../models/user';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  @Input() user: user;

  @Output() newUserEventEmitter: EventEmitter<user> = new EventEmitter<user>();

  constructor(){
    this.user = new user();
  }

  onSubmit(userForm: NgForm):void{
    if(userForm.valid){
      this.newUserEventEmitter.emit(this.user);
      userForm.reset();
      userForm.resetForm();
    }else{
      console.log('Formulario no válido');
    }
  }

  onClear(userForm: NgForm):void{
    userForm.reset();
    userForm.resetForm();
  }

}

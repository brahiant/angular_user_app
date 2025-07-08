import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { user } from '../../models/user';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  user: user;

  @Output() newUserEventEmitter: EventEmitter<user> = new EventEmitter<user>();

  constructor(){
    this.user = new user();
  }

  onSubmit(){
    console.log(this.user);
    this.newUserEventEmitter.emit(this.user);
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { user } from '../../models/user';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {
  @Input() users: user[] = [];

  @Output() idUserEventEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output() selectedUserEventEmitter: EventEmitter<user> = new EventEmitter<user>();

  onRemoveUser(id: number):void{
      this.idUserEventEmitter.emit(id);
  }

  onSelectUser(user: user):void{
    this.selectedUserEventEmitter.emit(user);
  }
}

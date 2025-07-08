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

  onRemoveUser(id: number):void{
    if(confirm('¿Estás seguro de querer eliminar este usuario?')){
      this.idUserEventEmitter.emit(id);
    }
  }
}

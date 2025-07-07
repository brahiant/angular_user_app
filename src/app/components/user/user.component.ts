import { Component, Input } from '@angular/core';
import { user } from '../../models/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {
  @Input() users: user[] = [];
}

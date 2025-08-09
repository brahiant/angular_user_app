import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { user } from '../../models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input() users: user[] = [];
  @Input() paginator= {};

}

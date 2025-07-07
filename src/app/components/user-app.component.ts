import { Component, OnInit } from '@angular/core';
import { user } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit{

   title: string = 'Listado de usuarios';
   users: user[] = [];
   constructor(private userService: UserService) {}

   ngOnInit(): void {
    this.userService.findAll().subscribe((users) => {
      this.users = users;
    });
   }
}

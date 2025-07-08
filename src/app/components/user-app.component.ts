import { Component, OnInit } from '@angular/core';
import { user } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
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

   addUser(user: user){
    this.users = [...this.users, {...user}];
   }
}

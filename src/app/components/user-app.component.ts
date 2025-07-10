import { Component, OnInit } from '@angular/core';
import { user } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit{

   title: string = 'Listado de usuarios';
   users: user[] = [];
   userSelected: user;
   open: boolean;


   constructor(private userService: UserService) {
    this.userSelected = new user();
    this.open = false;
   }


   ngOnInit(): void {
    this.userService.findAll().subscribe((users) => {
      this.users = users;
    });
   }

   addUser(user: user){
    if(user.id > 0){
      this.users = this.users.map(u => u.id === user.id ? {...user} : u);
    }else{
      this.users = [...this.users, {...user}];
    }
    Swal.fire({
      title: 'Usuario agregado',
      text: 'El usuario se ha agregado correctamente',
      icon: 'success'
    });
    this.setOpen();
   }

   removeUser(id: number){
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(user => user.id !== id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
   }

   selectedUser(userRow: user){
    this.userSelected = {...userRow};
    this.open = true;
   }

   setOpen(){
    this.open = !this.open;
   }
}

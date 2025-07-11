import { Component, OnInit } from '@angular/core';
import { user } from '../models/user';
import { UserService } from '../services/user.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import Swal from 'sweetalert2';
import { SharingDataService } from '../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit{

   users: user[] = [];

   constructor(private sharingDataService: SharingDataService, private userService: UserService, private route: Router) {
    if(this.route.getCurrentNavigation()?.extras.state){
      this.users = this.route.getCurrentNavigation()?.extras.state?.['users'] || [];
    }else{
      this.userService.findAll().subscribe((users) => {
        this.users = users;
      });
    }
   }


   ngOnInit(): void {
    this.userService.findAll().subscribe((users) => {
      this.users = users;
    });
    this.addUser();
    this.removeUser();
   }

   addUser() {
    this.sharingDataService.newUserEventEmitter.subscribe((user) => {
      // Validar que el usuario tenga datos válidos
      if (!user || !user.name || !user.lastName || !user.email) {
        // Puedes mostrar un error o simplemente no hacer nada
        return;
      }
      if (user.id > 0) {
        this.users = this.users.map(u => u.id === user.id ? { ...user } : u);
      } else {
        // Evitar agregar usuarios con id inválido
        const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
        this.users = [...this.users, { ...user, id: newId }];
      }
      this.route.navigate(['/users'], { state: { users: this.users } });
      Swal.fire({
        title: 'Usuario agregado',
        text: 'El usuario se ha agregado correctamente',
        icon: 'success'
      });
    });
  }

   removeUser(){
    this.sharingDataService.idUserEventEmitter.subscribe((id) => {
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
        this.route.navigate(['/users/create'], {skipLocationChange: true}).then(() => {
          this.route.navigate(['/users'], {state: {users: this.users}});
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  });
   }

}

import { Component, OnInit } from '@angular/core';
import { user } from '../models/user';
import { UserService } from '../services/user.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import Swal from 'sweetalert2';
import { SharingDataService } from '../services/sharing-data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit{

   users: user[] = [];
   paginator: any = [];

   constructor(private sharingDataService: SharingDataService, private userService: UserService, private route: Router, private activatedRoute: ActivatedRoute) {
    // Solo cargar usuarios si no vienen del estado de navegación
    if(this.route.getCurrentNavigation()?.extras.state){
      this.users = this.route.getCurrentNavigation()?.extras.state?.['users'] || [];
    }
   }


   ngOnInit(): void {
    // Solo cargar usuarios si no están ya cargados
    /*if (this.users.length === 0) {
      this.userService.findAll().subscribe({
        next: (users) => {
          this.users = users;
          // Notificar la lista inicial de usuarios
          this.sharingDataService.usersUpdatedEventEmitter.emit(this.users);
        },
        error: (error) => {
          console.error('Error al cargar usuarios:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudieron cargar los usuarios',
            icon: 'error'
          });
        }
      });
    }*/
    this.activatedRoute.paramMap.subscribe((params) => {
      const page = +(params.get('page') || '0');
      this.userService.findAllPage(page).subscribe((pageable) => {
        this.users = pageable.content as user[];
        this.sharingDataService.usersUpdatedEventEmitter.emit(this.users);
      });
    });
    
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
   }

   pageUsersEvent(){
    this.sharingDataService.pageableEventEmitter.subscribe((pageable) => {
      this.users = pageable.users;
      this.paginator = pageable.paginator;
    });
   }

   findUserById(){
    this.sharingDataService.findUserByIdEventEmitter.subscribe((id) => {
      const user = this.users.find(user => user.id === id);
      if(user){
        this.sharingDataService.selectedUserEventEmitter.emit(user);
      } else {
        // Si no se encuentra en el array local, intentar obtenerlo del backend
        this.userService.findById(id).subscribe({
          next: (userFromBackend) => {
            this.sharingDataService.selectedUserEventEmitter.emit(userFromBackend);
          },
          error: (error) => {
            console.error('UserAppComponent: Error al obtener usuario del backend:', error);
          }
        });
      }
    });
   }

   addUser() {
    this.sharingDataService.newUserEventEmitter.subscribe((user) => {
      // Validar que el usuario tenga datos válidos
      if (!user || !user.name || !user.lastname || !user.email || !user.username || !user.password) {
        Swal.fire({
          title: 'Error',
          text: 'Por favor completa todos los campos requeridos',
          icon: 'error'
        });
        return;
      }
      
      if (user.id && user.id > 0) {
        // Actualizar usuario existente
        this.userService.update(user).subscribe({
          next: (updatedUser) => {
            this.users = this.users.map(u => u.id === updatedUser.id ? updatedUser : u);
            // Notificar el cambio en la lista de usuarios
            this.sharingDataService.usersUpdatedEventEmitter.emit(this.users);
            Swal.fire({
              title: 'Usuario actualizado',
              text: 'El usuario se ha actualizado correctamente',
              icon: 'success'
            });
            this.route.navigate(['/users'], {
              state: {
                users: this.users,
                paginator: this.paginator
              }
            });
          },
          error: (error) => {
            console.error('UserAppComponent: Error al actualizar usuario:', error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo actualizar el usuario',
              icon: 'error'
            });
          }
        });
      } else {
        // Crear nuevo usuario - eliminar el ID si existe para que el backend lo trate como nuevo
        const newUser = { ...user };
        delete newUser.id;
        
        this.userService.save(newUser).subscribe({
          next: (savedUser) => {
            this.users = [...this.users, savedUser];
            // Notificar el cambio en la lista de usuarios
            this.sharingDataService.usersUpdatedEventEmitter.emit(this.users);
            Swal.fire({
              title: 'Usuario agregado',
              text: 'El usuario se ha agregado correctamente',
              icon: 'success'
            });
            this.route.navigate(['/users'], {
              state: {
                users: this.users,
                paginator: this.paginator
              }
            });
          },
          error: (error) => {
            console.error('UserAppComponent: Error al crear usuario:', error);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo crear el usuario',
              icon: 'error'
            });
          }
        });
      }
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
        // Llamar al servicio para eliminar del backend
        this.userService.delete(id).subscribe({
          next: () => {
            // Solo eliminar del array local si la eliminación en el backend fue exitosa
            this.users = this.users.filter(user => user.id !== id);
            // Notificar el cambio en la lista de usuarios
            this.sharingDataService.usersUpdatedEventEmitter.emit(this.users);
            Swal.fire({
              title: "Eliminado!",
              text: "El usuario ha sido eliminado correctamente.",
              icon: "success"
            });
            this.route.navigate(['/users'], {
              state: {
                users: this.users,
                paginator: this.paginator
              }
            });
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el usuario",
              icon: "error"
            });
          }
        });
      }
    });
  });
   }

}

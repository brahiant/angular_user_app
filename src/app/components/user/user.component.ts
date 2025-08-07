import { Component, EventEmitter, OnInit } from '@angular/core';
import { user } from '../../models/user';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{
  
  title: string = 'Listado de usuarios';
  users: user[] = [];

  ngOnInit(): void {
    // Cargar usuarios iniciales
    this.service.findAll().subscribe((users) => {
      this.users = users;
    });

    // Suscribirse a cambios en la lista de usuarios
    this.sharingDataService.usersUpdatedEventEmitter.subscribe((updatedUsers) => {
      this.users = updatedUsers;
    });
  }

  constructor(private sharingDataService: SharingDataService,private route: Router, private service: UserService){}


  onRemoveUser(id: number):void{
      this.sharingDataService.idUserEventEmitter.emit(id);
  }

  onSelectUser(user: user):void{
    if (user.id) {
      this.route.navigate(['/users/edit', user.id]);
    }
  }
}

import { Component, EventEmitter } from '@angular/core';
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
export class UserComponent {
  
  title: string = 'Listado de usuarios';
  users: user[] = [];

  constructor(private sharingDataService: SharingDataService,private route: Router, private service: UserService){
    if(this.route.getCurrentNavigation()?.extras.state){
      this.users = this.route.getCurrentNavigation()?.extras.state?.['users'] || [];
    }else{
      this.service.findAll().subscribe((users) => {
        this.users = users;
      });
    }
  }


  onRemoveUser(id: number):void{
      this.sharingDataService.idUserEventEmitter.emit(id);
  }

  onSelectUser(user: user):void{
    this.route.navigate(['/users/edit', user.id], {state: {user: user}});
  }
}

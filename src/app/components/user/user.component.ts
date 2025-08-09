import { Component, EventEmitter, OnInit } from '@angular/core';
import { user } from '../../models/user';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{
  
  title: string = 'Listado de usuarios';
  users: user[] = [];
  paginator: any = [];

  constructor(private sharingDataService: SharingDataService,private route: Router, private service: UserService, private activatedRoute: ActivatedRoute){
    if(this.route.getCurrentNavigation()?.extras.state){
      this.users = this.route.getCurrentNavigation()?.extras.state?.['users'] || [];
      this.paginator = this.route.getCurrentNavigation()?.extras.state?.['paginator'] || [];
    }
  }


  ngOnInit(): void {
    // Cargar usuarios iniciales
    /*this.service.findAll().subscribe((users) => {
      this.users = users;
    });*/
    this.activatedRoute.paramMap.subscribe((params) => {
      const page = +(params.get('page') || '0');
      this.service.findAllPage(page).subscribe((pageable) => {
        this.users = pageable.content as user[];
        this.paginator = pageable;
        this.sharingDataService.pageableEventEmitter.emit({users: this.users, paginator: this.paginator});
      });
    });

    // Suscribirse a cambios en la lista de usuarios
    this.sharingDataService.usersUpdatedEventEmitter.subscribe((updatedUsers) => {
      this.users = updatedUsers;
    });
  }

  onRemoveUser(id: number):void{
      this.sharingDataService.idUserEventEmitter.emit(id);
  }

  onSelectUser(user: user):void{
    if (user.id) {
      this.route.navigate(['/users/edit', user.id]);
    }
  }
}

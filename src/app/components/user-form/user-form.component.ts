import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { user } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router'; 
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  user: user;

  constructor(private sharingDataService: SharingDataService, private route: ActivatedRoute, private userService: UserService){
    this.user = new user();
    // No inicializar el ID para nuevos usuarios
    this.user.id = undefined;
  }

  ngOnInit(): void {
    this.sharingDataService.selectedUserEventEmitter.subscribe((user) => {
      this.user = user;
    });

   this.route.params.subscribe((params) => {
    const userId: number = +(params['id'] || 0);
    if(userId > 0){
      console.log('UserFormComponent: Editando usuario con ID:', userId);
      this.sharingDataService.findUserByIdEventEmitter.emit(userId);
      /*this.userService.findById(userId).subscribe((user) => {
        this.user = user;
      });*/
    } else {
      console.log('UserFormComponent: Creando nuevo usuario');
      // Asegurar que el ID sea undefined para nuevos usuarios
      this.user.id = undefined;
    }
   });
  }

  onSubmit(userForm: NgForm):void{
    console.log('UserFormComponent: Formulario enviado, datos:', this.user);
    console.log('UserFormComponent: Formulario válido:', userForm.valid);
    
    if(userForm.valid){
      console.log('UserFormComponent: Emitiendo usuario:', this.user);
      this.sharingDataService.newUserEventEmitter.emit(this.user);
      userForm.reset();
      userForm.resetForm();
    }else{
      console.log('UserFormComponent: Formulario no válido');
      console.log('UserFormComponent: Errores del formulario:', userForm.errors);
    }
  }

  onClear(userForm: NgForm):void{
    userForm.reset();
    userForm.resetForm();
  }
}

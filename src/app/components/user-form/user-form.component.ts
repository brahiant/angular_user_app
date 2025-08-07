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
      this.user = { ...user }; // Crear una copia para evitar referencias mutables
    });

   this.route.params.subscribe((params) => {
    const userId: number = +(params['id'] || 0);
    if(userId > 0){
      this.sharingDataService.findUserByIdEventEmitter.emit(userId);
    } else {
      // Asegurar que el ID sea undefined para nuevos usuarios
      this.user = new user();
      this.user.id = undefined;
    }
   });
  }

  onSubmit(userForm: NgForm):void{
    if(userForm.valid){
      this.sharingDataService.newUserEventEmitter.emit(this.user);
      // No resetear el formulario aquí, ya que puede causar problemas con la navegación
    }else{
      console.log('UserFormComponent: Formulario no válido');
    }
  }

  onClear(userForm: NgForm):void{
    userForm.reset();
    userForm.resetForm();
  }
}

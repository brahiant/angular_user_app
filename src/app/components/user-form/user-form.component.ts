import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { user } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  user: user;

  constructor(private sharingDataService: SharingDataService, private route: Router){
    this.user = new user();
    if(this.route.getCurrentNavigation()?.extras.state){
      this.user = this.route.getCurrentNavigation()?.extras.state?.['user'] || new user();
    }else{
      this.user = new user();
    }

  }

  onSubmit(userForm: NgForm):void{
    if(userForm.valid){
      this.sharingDataService.newUserEventEmitter.emit(this.user);
      userForm.reset();
      userForm.resetForm();
    }else{
      console.log('Formulario no válido');
    }
  }

  onClear(userForm: NgForm):void{
    userForm.reset();
    userForm.resetForm();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { user } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router'; 


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  user: user;

  constructor(private sharingDataService: SharingDataService, private route: ActivatedRoute, ){
    this.user = new user();

  }

  ngOnInit(): void {
    this.sharingDataService.selectedUserEventEmitter.subscribe((user) => {
      this.user = user;
    });

   this.route.params.subscribe((params) => {
    const userId: number = +(params['id'] || 0);
    if(userId>0){
      this.sharingDataService.findUserByIdEventEmitter.emit(userId);
    }
   });
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

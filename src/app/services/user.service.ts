import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: user[] = [{
    id: 1,
    name: 'Juan',
    lastName: 'Perez',
    email: 'juan.perez@gmail.com',
    username: 'juanperez',
    password: '123456'
  },
  {
    id: 2,
    name: 'Maria',
    lastName: 'Gomez',
    email: 'maria.gomez@gmail.com',
    username: 'mariagomez',
    password: '123456'
  }
];

  constructor() { 
  }

  findAll(): Observable<user[]> {
    return of(this.users);
  }
}

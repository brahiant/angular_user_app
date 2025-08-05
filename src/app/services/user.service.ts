import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: user[] = [];
  constructor(private http: HttpClient) { 
  }

  findAll(): Observable<user[]> {
    return this.http.get('http://localhost:8080/api/users').pipe(
      map((response: any) => response as user[])
    );
  }
}

import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: user[] = [];
  private url = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { 
  }

  findAll(): Observable<user[]> {
    return this.http.get<user[]>(this.url)
  }

  findById(id: number): Observable<user> {
    return this.http.get<user>(`${this.url}/${id}`)
  }

  save(user: user): Observable<user> {
    return this.http.post<user>(this.url, user)
  }

  update(user: user): Observable<user> {
    return this.http.put<user>(this.url, user)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }
}   


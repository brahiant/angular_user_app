import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { Observable, of, map, catchError, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: user[] = [];
  private url = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { 
  }

  findAll(): Observable<user[]> {
    return this.http.get<user[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  findById(id: number): Observable<user> {
    return this.http.get<user>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  save(user: user): Observable<user> {
    return this.http.post<user>(this.url, user).pipe(
      catchError(this.handleError)
    );
  }

  update(user: user): Observable<user> {
    return this.http.put<user>(`${this.url}/${user.id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('UserService: Error en petición HTTP:', error);
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del cliente:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Código de error: ${error.status}, mensaje: ${error.message}`);
    }
    throw error;
  }
}   


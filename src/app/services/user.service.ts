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
    console.log('UserService: Obteniendo todos los usuarios');
    return this.http.get<user[]>(this.url).pipe(
      tap(users => console.log('UserService: Usuarios obtenidos:', users)),
      catchError(this.handleError)
    );
  }

  findById(id: number): Observable<user> {
    console.log('UserService: Obteniendo usuario con ID:', id);
    return this.http.get<user>(`${this.url}/${id}`).pipe(
      tap(user => console.log('UserService: Usuario obtenido:', user)),
      catchError(this.handleError)
    );
  }

  save(user: user): Observable<user> {
    console.log('UserService: Guardando usuario:', user);
    return this.http.post<user>(this.url, user).pipe(
      tap(savedUser => console.log('UserService: Usuario guardado:', savedUser)),
      catchError(this.handleError)
    );
  }

  update(user: user): Observable<user> {
    console.log('UserService: Actualizando usuario:', user);
    return this.http.put<user>(this.url, user).pipe(
      tap(updatedUser => console.log('UserService: Usuario actualizado:', updatedUser)),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    console.log('UserService: Eliminando usuario con ID:', id);
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => console.log('UserService: Usuario eliminado con ID:', id)),
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


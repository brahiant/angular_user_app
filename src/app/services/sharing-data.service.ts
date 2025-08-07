import { EventEmitter, Injectable } from '@angular/core';
import { user } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<user> = new EventEmitter<user>();
  
  private _idUserEventEmitter: EventEmitter<number> = new EventEmitter<number>();

  private _findUserByIdEventEmitter: EventEmitter<number> = new EventEmitter<number>()

  private _selectedUserEventEmitter: EventEmitter<user> = new EventEmitter<user>();

  private _usersUpdatedEventEmitter: EventEmitter<user[]> = new EventEmitter<user[]>();
  

  constructor() {}

  get findUserByIdEventEmitter(): EventEmitter<number> {
    return this._findUserByIdEventEmitter;
  }

  get selectedUserEventEmitter(): EventEmitter<user> {
    return this._selectedUserEventEmitter;
  }

  get newUserEventEmitter(): EventEmitter<user> {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<number> {
    return this._idUserEventEmitter;
  }

  get usersUpdatedEventEmitter(): EventEmitter<user[]> {
    return this._usersUpdatedEventEmitter;
  }

}

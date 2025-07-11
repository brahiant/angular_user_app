import { EventEmitter, Injectable } from '@angular/core';
import { user } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmitter: EventEmitter<user> = new EventEmitter<user>();
  
  private _idUserEventEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  get newUserEventEmitter(): EventEmitter<user> {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<number> {
    return this._idUserEventEmitter;
  }


}

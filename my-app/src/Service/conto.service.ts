import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContoService {
  aggCont: EventEmitter<void> = new EventEmitter<void>();
  aggContFinal : EventEmitter<void> = new EventEmitter<void>();
  constructor() {

  }

  agiornaContatore(){
    this.aggCont.emit(); 
  }
  agiornaContoFinal(){
    this.aggContFinal.emit()
  }
}

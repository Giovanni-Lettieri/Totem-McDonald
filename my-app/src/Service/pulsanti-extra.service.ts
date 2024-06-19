import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PulsantiExtraService {

  extraButton : EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
  
  sonoApparso(){
    this.extraButton.emit()
  }
}

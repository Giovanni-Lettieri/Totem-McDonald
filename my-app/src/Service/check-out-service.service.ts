import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckOutServiceService {
  entrata!: boolean
  entrataChange: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }
  InUscita(){
    this.entrata = false;
    this.entrataChange.emit()
  }
  InEntrata(){
    this.entrata = true
    this.entrataChange.emit()
  }
}

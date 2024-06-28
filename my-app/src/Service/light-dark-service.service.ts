import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LightDarkServiceService {
  darkMode: boolean = false
  cambioMod: EventEmitter<string> = new EventEmitter<string>();
  constructor() {

  }

  switchMode(){
    this.darkMode = !this.darkMode
    this.cambioMod.emit()
  }

  background(){
    this.cambioMod.emit()
    return (this.darkMode)? 'black': '#EFECE5'
  }
  backgroundBlack(){
    return (this.darkMode)? 'black': 'white'
  }
  background2(){
    return (this.darkMode)? '#121212': '#EFECE5'
  }
  pulsBackground(){
    return (this.darkMode)? '#090909': 'white'
  }
  testi(){
    return (this.darkMode)? 'white': 'black'
  }
  testiInv(){
    return (this.darkMode)? 'black': 'white'
  }
  VerdeBackground(){
    return (this.darkMode)? '#1a4e24': '#2b7b3b'
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  BSOpen!: boolean
  mP!: MainPageComponent
  
  overlayChange: EventEmitter<void> = new EventEmitter<void>();
  animationStateChanged: any;

  constructor() {
    this.BSOpen = false
  }

  switch(){
    this.overlayChange.emit();
  }

}

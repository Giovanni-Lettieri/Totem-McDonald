import { EventEmitter, Injectable } from '@angular/core';
import { Prodotti } from '../prodotti/prodotti';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetOpenCloseService {
  bottomSheetAperto: boolean = false //QUI
  vaiAlBill: boolean = true
  bTAChange: EventEmitter<void> = new EventEmitter<void>();
  c: Prodotti = {
    item: "",
    price: 0,
    image: "",
    category: "",
    sconto: 0
  }
  constructor() { }

  bottomSheetOpened(){
    this.bottomSheetAperto = true
    this.vaiAlBill = true
    this.bTAChange.emit()
  }
  bottomSheetClosed(){
    this.bottomSheetAperto = false
    this.vaiAlBill = true
    this.bTAChange.emit()
  }
  getC(){
    return this.c;
  }
  setC(prod: Prodotti){
    this.c = prod
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { Prodotti } from '../prodotti/prodotti';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetOpenCloseService {
  bottomSheetAperto: boolean = false //QUI
  bottomSideAperto : boolean = false
  vaiAlBill: boolean = true
  hiddenCenter: boolean = true;
  hidden: boolean = false
  
  bTAChange: EventEmitter<void> = new EventEmitter<void>();
  sideChange : EventEmitter<void> = new EventEmitter<void>();
  c: Prodotti = {
    item: "",
    price: 0,
    image: "",
    category: "",
    sconto: 0,    
    toppings: []
  }
  constructor() { }


  //originale
  bottomSheetOpened(){
    this.bottomSheetAperto = true
    this.hiddenCenter = true
    this.vaiAlBill = true
    this.bTAChange.emit()
  }
  bottomSheetClosed(){
    this.bottomSheetAperto = false
    this.hidden = true
    this.bTAChange.emit()
  }
  hiddenCenterTrue(){
    this.hiddenCenter = true
    this.bTAChange.emit()
  }
  hiddenCenterFalse(){
    this.hiddenCenter = false
    this.vaiAlBill = false
    this.bTAChange.emit()
  }
  hiddenTrue(){
    this.hidden = true
    this.bTAChange.emit()
  }

  //bottom sheet side
  bottomSideOpened(){
    this.bottomSideAperto = true
    this.hiddenCenter = true
    this.vaiAlBill = true
    this.sideChange.emit()
  }
  bottomSideClosed(){
    this.bottomSideAperto = false
    this.hidden = true
    this.sideChange.emit()
  }

  //Bottom sheet customize
  bottomSheetCustomizeAperto: boolean = false
  BottomSheetCustomize: EventEmitter<void> = new EventEmitter<void>();

  OpenBottomSheetCustomize(){
    this.bottomSheetCustomizeAperto = true
    this.BottomSheetCustomize.emit()
  }
  CloseBottomSheetCustomize(){
    this.bottomSheetCustomizeAperto = false
    this.BottomSheetCustomize.emit()
  }

  //generiche 
  getC(){
    return this.c;
  }
  setC(prod: Prodotti){
    this.c = prod
  }
}

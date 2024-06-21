import { EventEmitter, Injectable } from '@angular/core';
import { BillProd } from '../Bill/bill-prod';

@Injectable({
  providedIn: 'root'
})
export class InfoBillService {

  infoBill: EventEmitter<void> = new EventEmitter<void>();
  acquisti :BillProd[] = []
  conto : number = 0 
  constructor() {}
  
  setAcquisti(b : BillProd[]){
    this.acquisti = b
  }
  setConto(c : number){
    this.conto = c
  }

  aggiorna(){
    this.infoBill.emit()
  }

  reset(){
    this.acquisti = []
  }

  getAcquisti() : BillProd[] {
    return this.acquisti
  }

  getConto() : number{
    return this.conto
  }
  
}

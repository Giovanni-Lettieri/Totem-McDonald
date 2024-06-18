import { EventEmitter, Injectable } from '@angular/core';
import { BillProd } from '../Bill/bill-prod';

@Injectable({
  providedIn: 'root'
})
export class InfoBillService {

  infoBill: EventEmitter<void> = new EventEmitter<void>();
  acquisti :BillProd[] = []

  constructor() {}
  
  setAcquisti(b : BillProd[]){
    this.acquisti = b
    this.infoBill.emit()
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
  
}

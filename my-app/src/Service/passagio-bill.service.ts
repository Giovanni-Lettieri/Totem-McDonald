import { Injectable, EventEmitter } from '@angular/core';
import { Prodotti } from '../prodotti/prodotti';
import { BillProd } from '../Bill/bill-prod';

@Injectable({
  providedIn: 'root'
})
export class PassagioBillService {

  x!: Prodotti;
  y!: BillProd;
  q!: number; 
  // q!: number; 
  // EventEmitter per notificare i cambiamenti
  ProdChange: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  setProd(p: Prodotti , q:number) {
    this.x = p;
    this.q = q; 
    this.ProdChange.emit();  // Notifica i cambiamenti
  }

  getBillProd(): BillProd {
      this.y = {
        category: this.x.category,
        image: this.x.image,
        item: this.x.item,
        price: this.x.price,
        quantita: this.q,
        sconto : this.x.sconto
      };
      return this.y;
  }
}

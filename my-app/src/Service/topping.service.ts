import { EventEmitter, Injectable } from '@angular/core';
import { Topping } from '../bottom-sheet-customize/topping';
import { PassagioBillService } from './passagio-bill.service';
@Injectable({
  providedIn: 'root'
})
export class ToppingService{

  listaTopping: Topping[] = []
  applyPremuto: boolean = false
  aggiunte!: number
  applyEE: EventEmitter<void> = new EventEmitter<void>();
  prezzoChange: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
  //get e set
  getLista(){
    return this.listaTopping
  }
  setLista(l: Topping[]){
    this.listaTopping = [...l]
  }
  //Quantità
  getQuantita(i: number){
    return this.listaTopping[i].quantity
  }
  setQuantita(q: number, c:string){
    if(this.listaTopping.findIndex(x => x.name === c)>=0){
      this.listaTopping[this.listaTopping.findIndex(x => x.name === c)].quantity = q
    }
  }

  //Apply
  applyOn(){
    this.applyPremuto = true
    this.applyEE.emit()
  }
  //Set/get prezzo aggiunte
  AggiuntaPrezzo(p: number){
    this.aggiunte = p
    this.prezzoChange.emit()
  }
  RiduzionePrezzo(p: number){
    this.aggiunte = -p
    this.prezzoChange.emit()
  }
  getPrezzoAggRid(){
    return this.aggiunte
  }
}

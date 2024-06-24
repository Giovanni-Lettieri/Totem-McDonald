import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalitaConsumoService{

  constructor() {}

  bottone !: number

  getBottone() : number{
    return this.bottone
  }

  setBottone(index : number){
    if(index == 1 || index == 0){     
      this.bottone = index;
    }
  }

}

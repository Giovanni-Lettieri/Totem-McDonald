import { Injectable } from '@angular/core';
import { Prodotti } from '../prodotti/prodotti';
import { ChangeLanguagesService } from './change-languages.service';

@Injectable({
  providedIn: 'root',
})

export class ProdottiService {
  prodList: Prodotti[] = this.lingSer.getProduct()
  prodPopular: number[] = new Array(6); 
  flagPop: boolean = false
  flagRand!: boolean
  estrazione!: number
  x !: Prodotti

  constructor(private lingSer : ChangeLanguagesService){
    for (let i = 0; i<6;){
      this.flagRand = false
      this.estrazione = Math.floor(Math.random() * this.prodList.length)
      for(let i=0;i<this.prodPopular.length;i++){
        if(this.prodPopular[i] == this.estrazione) this.flagRand = true
      }
      if(this.flagRand == false){
        this.prodPopular[i] = this.estrazione
        i++;
      } 
    }
  } 
  
  pseudoEmit(){
    this.prodList = this.lingSer.getProduct()
    this.flagPop = false
    this.randomizeProdotti()
  }
  
  getProdotti() {
    return this.prodList;
  }
  
  randomizeProdotti(): void {
    for(let i=0;i<this.prodList.length;i++){
      if(this.prodList[i].category === this.lingSer.getTesto().Pop) this.flagPop = true;
    }
    if(this.flagPop == false){
      for (let i = 0; i < 6; i++) {
        const x = { ...this.prodList[this.prodPopular[i]] };
        x.category = this.lingSer.getTesto().Pop
        this.prodList.push(x);
      }
    }
    
  }
}
import { Injectable } from '@angular/core';
import { Prodotti } from '../prodotti/prodotti';
import { ChangeLanguagesService } from './change-languages.service';

@Injectable({
  providedIn: 'root',
})

export class ProdottiService {
  prodList: Prodotti[] = this.lingSer.getProduct()
  prodPopular: number[] = new Array(6); 
  prodMenuScont: number[] = new Array(5);
  prodCM: Prodotti[] = new Array
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

    this.flagRand = false;

    for(let i=0;i<this.prodMenuScont.length;){
      this.flagRand = false
      this.estrazione = Math.floor(Math.random() * 11)
      for(let i=0;i<this.prodPopular.length;i++){
        if(this.prodMenuScont[i] == this.estrazione) this.flagRand = true
      }
      if(this.flagRand == false){
        this.prodMenuScont[i] = this.estrazione
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
  getCM() {
    return this.prodCM;
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
    this.randomizeSconti()
  }
  randomizeSconti(){
    for (let i = 0; i < this.prodMenuScont.length; i++) {
      this.prodList[this.prodMenuScont[i]].sconto = Math.floor((Math.random() *60)+1)
      this.prodList[this.prodMenuScont[i]].price = this.prodList[this.prodMenuScont[i]].price-(this.prodList[this.prodMenuScont[i]].price*(this.prodList[this.prodMenuScont[i]].sconto/100))
      this.prodCM.push(this.prodList[this.prodMenuScont[i]])
    }
  }
}
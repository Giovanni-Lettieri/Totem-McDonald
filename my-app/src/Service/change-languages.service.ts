import { EventEmitter, Injectable } from '@angular/core';
import { Lingua } from '../language/lingua';
import { Prodotti } from '../prodotti/prodotti';
import { Category } from '../category/category';
import { Testi } from '../app/testi';

import lingueJson from '../../public/data/lingue.json';
//ita
import liCatIta from '../../public/data/Lingue/Ita/categorie.json';
import liTestIta from '../../public/data/Lingue/Ita/testi.json';
import liProdIta from '../../public/data/Lingue/Ita/prodotti.json';
//usa
import liCatUsa from '../../public/data/Lingue/Usa/categories.json';
import liTestUsa from '../../public/data/Lingue/Usa/text.json';
import liProdUsa from '../../public/data/Lingue/Usa/products.json';
//deu 
import liCatDeu from '../../public/data/Lingue/Deu/kategorien.json';
import liTestDeu from '../../public/data/Lingue/Deu/texte.json';
import liProdDeu from '../../public/data/Lingue/Deu/produkte.json';
//fra
import liCatFra from '../../public/data/Lingue/Fra/categories.json';
import liTestFra from '../../public/data/Lingue/Fra/textes.json';
import liProdFra from '../../public/data/Lingue/Fra/produits.json';
import { BillProd } from '../Bill/bill-prod';



@Injectable({
  providedIn: 'root'
})


export class ChangeLanguagesService {

  cambioLingua: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}


  //lista deggli src per ogni lingua
  lingueList : Lingua[] = lingueJson;              
  
  //lingua selezionata 
  linguaUtilizata : Lingua = this.lingueList[0];  //lingua preimpostata


  //variabili di suporto
  prodList !: Prodotti[]; 
  cateList !: Category[]; 
  testSelect !: Testi;

  setLingua(l:Lingua){
    if(l != this.linguaUtilizata){
      this.linguaUtilizata = l; 
      this.cambioLingua.emit()
    }
  }

  getLinguaSel(){
    return this.linguaUtilizata;
  }
  getLingue(){
    return this.lingueList
  }

  //ritorna i tsti fissi
  getTesto(){
    switch(this.linguaUtilizata.id){
      case 0:
        this.testSelect = liTestIta;
      break; 
      
      case 1:
        this.testSelect = liTestUsa;
      break;

      case 2:
        this.testSelect = liTestDeu;
      break;
      
      case 3:
        this.testSelect = liTestFra;
      break;
    }
    return this.testSelect
  }

  // ritorna le categorie
  getCategory(){
    switch(this.linguaUtilizata.id){
      case 0:
        this.cateList = liCatIta
      break; 
      
      case 1: 
        this.cateList = liCatUsa
      break;

      case 2:
        this.cateList = liCatDeu
      break;
      
      case 3:
        this.cateList = liCatFra
      break;
    }
    return this.cateList
  }

  // ritorna i prodotti
  getProduct(){
    switch(this.linguaUtilizata.id){
      case 0:
        this.prodList = liProdIta
      break; 
      
      case 1: 
        this.prodList = liProdUsa
      break;

      case 2:
        this.prodList = liProdDeu
      break;
      
      case 3:
        this.prodList = liProdFra
      break;
    }
    return this.prodList
  }

  //retrun del nome tradotto di un prodotto specifico
  changeProd(p : string) : string{ 
    this.getProduct()
    for(let i = 0 ; i <= this.prodList.length ; i++) {
      if(p == this.prodList[i].image){
        return this.prodList[i].item
      }
    }
    return "Errore Traduzione"
  }
  

}

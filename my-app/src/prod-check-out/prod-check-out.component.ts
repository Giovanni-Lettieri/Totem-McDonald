import { Component, EventEmitter, Output, input, output } from '@angular/core';
import { BillProd } from '../Bill/bill-prod';
import { ContoService } from '../Service/conto.service';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs/internal/Subscription';

registerLocaleData(localeIt)
registerLocaleData(localeEn)

@Component({
  selector: 'prod-check-out',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './prod-check-out.component.html',
  styleUrl: './prod-check-out.component.css'
})
export class ProdCheckOutComponent {

  extraFlag : boolean = false;
  prodotto = input.required<BillProd>()
  
  rimuoviText : string = this.lingSer.getTesto().remove; 
  castomText : string = this.lingSer.getTesto().custom; 
  cur : string = this.lingSer.getTesto().Curency; 

  @Output() rimozione = new EventEmitter<BillProd>();

  constructor(
    private servCont: ContoService,
    private lingSer: ChangeLanguagesService
  ){}

  subscription !: Subscription;

  ngOnInit(): void {  
    this.subscription = this.lingSer.cambioLingua.subscribe(() => { 
      this.cur = this.lingSer.getTesto().Curency;
      this.rimuoviText  = this.lingSer.getTesto().remove; 
      this.castomText = this.lingSer.getTesto().custom; 
      
      this.prodotto().item = this.lingSer.changeBillProd(this.prodotto())
    });
  }

  add(){
    this.prodotto().quantita++
    this.servCont.agiornaContoFinal();
  }

  minus(){
    this.prodotto().quantita--
    if(this.prodotto().quantita <= 0){
      this.remove()
    }
    this.servCont.agiornaContoFinal();
  }

  remove() {
    this.rimozione.emit(this.prodotto())
    this.servCont.agiornaContoFinal();
  }
}

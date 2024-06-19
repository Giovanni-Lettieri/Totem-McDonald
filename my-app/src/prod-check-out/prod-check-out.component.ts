import { Component, ElementRef, EventEmitter, HostListener, Output, input, output } from '@angular/core';
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
  
  private pressHoldTimer: any;

  constructor(
    private servCont: ContoService,
    private lingSer: ChangeLanguagesService,
    private el : ElementRef
  ){}
  private pressTimer: any;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.pressHoldTimer = setTimeout(() => {
      console.log("funge")
      this.extraFlag = true;
      clearTimeout(this.pressHoldTimer);
    },500); 
  }

 
  @HostListener('document:click', ['$event'])
  ClickFuori(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('section')) {
      this.extraFlag = false;
      console.log("basta")
    }
  }

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
    clearTimeout(this.pressHoldTimer);
    this.prodotto().quantita++
    this.servCont.agiornaContoFinal();
  }

  minus(){
    clearTimeout(this.pressHoldTimer);
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

  edit() {
    this.extraFlag = true;
    console.log("asdasdsadsadsadsad")
    //AGGIUNGI
  }
}

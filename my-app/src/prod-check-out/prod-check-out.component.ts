import { Component, ElementRef, EventEmitter, HostListener, Output, input, output } from '@angular/core';
import { BillProd } from '../Bill/bill-prod';
import { ContoService } from '../Service/conto.service';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs/internal/Subscription';
import {PulsantiExtraService} from '../Service/pulsanti-extra.service'

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
  
  timeout: any;

  rimuoviText : string = this.lingSer.getTesto().remove; 
  castomText : string = this.lingSer.getTesto().custom; 
  cur : string = this.lingSer.getTesto().Curency; 

  @Output() rimozione = new EventEmitter<BillProd>();

  constructor(
    private servCont: ContoService,
    private lingSer: ChangeLanguagesService,
    private extraServ : PulsantiExtraService
  ){}

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.timeout = setTimeout(() => {
      this.extraServ.sonoApparso()
      this.extraFlag = true
    }, 1000);
  }

  @HostListener('touchend')
  onTouchEnd(): void {
    clearTimeout(this.timeout);
  }

  @HostListener('touchmove')
  onTouchMove(): void {
    clearTimeout(this.timeout);
  }
  
  @HostListener('document:click', ['$event'])
  ClickFuori(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('span')) {
      this.extraFlag = false;
      console.log("basta")
    }
  }

  subscription !: Subscription;
  subscription2 !: Subscription;

  ngOnInit(): void {  
    this.subscription = this.lingSer.cambioLingua.subscribe(() => { 
      this.cur = this.lingSer.getTesto().Curency;
      this.rimuoviText  = this.lingSer.getTesto().remove; 
      this.castomText = this.lingSer.getTesto().custom; 
      
      this.prodotto().item = this.lingSer.changeBillProd(this.prodotto())
    });
    this.subscription2 = this.extraServ.extraButton.subscribe(() => { 
      this.extraFlag = false; 
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

  edit() {
    console.log("asdasdsadsadsadsad")
    //AGGIUNGI
  }
}

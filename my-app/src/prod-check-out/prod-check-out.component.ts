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
import { trigger, state, style, animate, transition } from '@angular/animations';

registerLocaleData(localeIt)
registerLocaleData(localeEn)

@Component({
  selector: 'prod-check-out',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './prod-check-out.component.html',
  styleUrl: './prod-check-out.component.css',
  animations: [
    trigger('slideAcquisto', [
      
      state('start', style({ transform: 'translateX(0%)' })),
      
      state('end', style({ transform: 'translateX(-120%)'})),
      
      transition('start => end', [
        animate('400ms ease-out', style({ transform: 'translateX(-120%)' }))
      ]),
    ]),

    trigger('popExtra', [
      state('start', style({ transform: 'scale(0)' })),
      state('end', style({ transform: 'scale(1)'})),
      transition('end => start', [
        animate('300ms ease-in', style({ transform: 'scale(0)' }))
      ]),
      transition('start => end', [
        animate('300ms ease-out', style({ transform: 'scale(1)' }))
      ]),
    ])
  ]
})

export class ProdCheckOutComponent {

  extraFlag : boolean = false;

  //controllo animazioen
  animation_slideAcquisto_flag : boolean = true; 
  animation_popExtra_Flag : boolean = true; 

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
      this.animation_popExtra_Flag = false; 
    }, 500);
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
      this.animation_popExtra_Flag = true; 
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
      this.animation_popExtra_Flag = true; 
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
    this.animation_slideAcquisto_flag = false
    setTimeout(() => {
      this.rimozione.emit(this.prodotto())
      this.servCont.agiornaContoFinal();
    } , 400);  
  }

  edit() {
    //AGGIUNGI
  }
}

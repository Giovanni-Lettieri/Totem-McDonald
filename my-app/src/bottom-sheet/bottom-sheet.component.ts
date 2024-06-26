import { Component, OnInit, OnDestroy, ViewContainerRef, input } from '@angular/core';
import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PassagioBillService } from '../Service/passagio-bill.service';
import { Prodotti } from '../prodotti/prodotti';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { ProdottiService } from '../Service/prodotti.service';
import { Subscription } from 'rxjs';
import { OverlayService } from '../Service/overlay.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LightDarkServiceService } from '../Service/light-dark-service.service';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { BottomSheetOpenCloseService } from '../Service/bottom-sheet-open-close.service';
import { ToppingService } from '../Service/topping.service';

registerLocaleData(localeIt);
registerLocaleData(localeEn);

@Component({
  selector: 'app-bottom-sheet-content',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CurrencyPipe],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css'],
  animations: [
    trigger('slideAnimation', [
      state('hidden', style({ transform: 'translateX(100%)', opacity: 0 })),
      state('visible', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('hidden => visible', animate('300ms ease-in')),
      transition('visible => hidden', animate('300ms ease-out')),
    ]),

    trigger('andataAlBIll', [
      state('start', style({ transform: 'translateX(0%) translateY(0%) scale(1)' })),
      state('end', style({ transform: 'translateX(58%) translateY(8.5%) scale(0.2)'})),
      transition('start => end', [
        animate('200ms ease-out', style({ transform: 'translateX(58%) translateY(8.5%) scale(0.2)' }))
      ]),
    ]),

    trigger('holeState', [
      state('shown', style({
        clipPath: 'circle(100% at 50% 25%)',
        pointerEvents: 'auto'
      })),
      state('hiddenCenter', style({
        clipPath: 'circle(8% at 50% 25%)',
        pointerEvents: 'auto'
      })),
      state('hidden', style({
        clipPath: 'circle(2% at 84% 20%)',
        pointerEvents: 'none'
      })),
    
      transition('shown => hiddenCenter', animate('0.2s linear')),
      transition('hiddenCenter => shown', animate('0.2s linear')),
      transition('hidden => hiddenCenter', animate('0.2s linear')),
      transition('hiddenCenter => hidden', animate('0.2s linear')),
      transition('shown => hidden', animate('0.2s linear')),
      transition('hidden => shown', [
        animate('0s linear', style({ clipPath: 'circle(8% at 50% 25%)' })),
        animate('0.2s linear', style({ clipPath: 'circle(100% at 50% 20%)' }))
      ])
    ]),
    trigger('bounce', [
      state('start', style({ transform: 'translateY(0%)' })),
      state('end', style({ transform: 'translateY(0%)'})),
      transition('start => end', [
        animate('150ms ease-in', style({ transform: 'translateY(-30%)' }))
      ])
    ]),
  ]
})
export class BottomSheetComponent implements OnInit, OnDestroy {
  // Variabili
  viewContainerRef: ViewContainerRef | undefined;
  subscription!: Subscription;
  Cur: string = this.lingSer.getTesto().Curency;
  fatto: string = this.lingSer.getTesto().Fatto;
  comMeal: string = this.lingSer.getTesto().CM;
  prodList!: Prodotti[];
  _adAtt: number = 0;
  quantita: number = 1;
  src!: String;
  pSuport!: Prodotti[];
  data = input.required<Prodotti>()
  bottomSheetAperto!: boolean
  vadoAlBill : boolean = true;
  hiddenCenter: boolean = true
  hidden: boolean = false
  bounceIncrementazione : boolean = false; 
  subscriptionBottomSheet!: Subscription

  prezzoCopia!:number //Faccio una copia del prezzo in modo da resettarlo insieme ai topping

  custPremuto: boolean = false //Variabile che controlla quando viene premuto customize 

  vacciAlBill(){
    this.vadoAlBill = false
  }
  constructor(
    private service: PassagioBillService,
    private lingSer: ChangeLanguagesService,
    private prodottiService: ProdottiService,
    private overlay: OverlayService,
    private lDServ: LightDarkServiceService,
    private btsServ: BottomSheetOpenCloseService,
    private topServ: ToppingService
  ) {
    this.prodList = prodottiService.getCM();
  }

  // Pubblicità
  get adAtt(): number {
    return this._adAtt;
  }

  set adAtt(value: number) {
    if (value !== this._adAtt) {
      this._adAtt = value;
    }
  }

  //Chiusura bottom sheet
  close(): void { 
    setTimeout(() => {
      if(this.prezzoCopia>0)this.data().price = this.prezzoCopia
    },200);
    this.btsServ.bottomSheetClosed()
    this.overlay.switch();
  }

  hCT(){
    this.btsServ.hiddenCenterTrue()
  }
  hCF(){
    this.btsServ.hiddenCenterFalse()
  }
  hT(){
    this.btsServ.hiddenTrue()
  }

  setProd(p: Prodotti, q: number) {
    this.topServ.setLista([...this.data().toppings])
    this.service.setProd(p, q);
    setTimeout(() => {
      this.quantita = 1; 
    },200);
    this.close();
  }

  plus(){
    this.quantita++;
    this.bounceIncrementazione = true;
    setTimeout(() => {
      this.bounceIncrementazione = false;
    }, 150); 
  }

  minus() {
    if (this.quantita > 1) {
      this.quantita--;
    }
  } 

  //Cambio bottom sheet con ad
  goToAdd(p: Prodotti) {
    this.btsServ.bottomSheetClosed();
    //Senza non va
    setTimeout(() => {
      this.btsServ.setC(p);
      this.btsServ.bottomSheetOpened();
    },200);
  }

  ngOnInit(): void {
    //Cambio ad
    setInterval(() => {
      this.adAtt = (this.adAtt + 1) % this.prodList.length;
    }, 5000);

    // Cambio Lingua
    this.subscription = this.lingSer.cambioLingua.subscribe(() => {
      this.Cur = this.lingSer.getTesto().Curency;
      this.fatto = this.lingSer.getTesto().Fatto;
      this.src = this.data().image;
      this.pSuport = this.lingSer.getProduct();
      for (let i = 0; i < this.pSuport.length; i++) {
        if (this.data().image === this.pSuport[i].image) {
          this.data().item = this.pSuport[i].item;
          break;
        }
      }
    });
    this.subscriptionBottomSheet = this.btsServ.bTAChange.subscribe(() => {
      this.bottomSheetAperto = this.btsServ.bottomSheetAperto
      this.hiddenCenter = this.btsServ.hiddenCenter
      this.vadoAlBill = this.btsServ.vaiAlBill
      this.hidden = this.btsServ.hidden
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //Customize bottom sheet
  OpenBottomSheetCustomize(){
    this.custPremuto= true
    setTimeout(() => {
      this.custPremuto= false
    }, 100);
    if(this.data().toppings.length>0){
      this.prezzoCopia = this.data().price
      this.btsServ.OpenBottomSheetCustomize()
    } 
  }
  getCustomizePremuto(){
    if(this.custPremuto && this.data().toppings.length<=0){
      return (this.lDServ.darkMode)?'#1f1e1e':'#d1cdc3'
    }
    return (this.lDServ.darkMode)?'#121212':'#EFECE5'
  }

  //Palette di colori
  getBackgroundColor(){
    return this.lDServ.backgroundBlack()
  }
  getTestiColor(){
    return this.lDServ.testi()
  }
  getPulsBackground(){
    return this.lDServ.background2()
  }
  getGialloColor(){
    return this.lDServ.GialloBackground()
}
}
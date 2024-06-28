import { Component, effect, input } from '@angular/core';
import { Prodotti } from '../prodotti/prodotti';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription, timeout } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { BottomSheetOpenCloseService } from '../Service/bottom-sheet-open-close.service';
import { OverlayService } from '../Service/overlay.service';
import { LightDarkServiceService } from '../Service/light-dark-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PassagioBillService } from '../Service/passagio-bill.service';

registerLocaleData(localeIt)
registerLocaleData(localeEn)

@Component({
  selector: 'app-bottom-sheet-side',
  standalone: true,
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './bottom-sheet-side.component.html',
  styleUrl: './bottom-sheet-side.component.css',
  animations:[
    trigger('bounce', [
      state('start', style({ transform: 'translateY(0%)' })),
      state('end', style({ transform: 'translateY(0%)'})),
      transition('start => end', [
        animate('150ms ease-in', style({ transform: 'translateY(-30%)' }))
      ])
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
        clipPath: 'circle(2% at 84% 13%)',
        pointerEvents: 'none'
      })),
    
      transition('shown => hiddenCenter', animate('0.2s linear')),
      transition('hiddenCenter => shown', animate('0.2s linear')),
      transition('hidden => hiddenCenter', animate('0.2s linear')),
      transition('hiddenCenter => hidden', animate('0.2s linear')),
      transition('shown => hidden', animate('0.2s linear')),
      transition('hidden => shown', [
        animate('0s linear', style({ clipPath: 'circle(8% at 50% 25%)' })),
        animate('0.2s linear', style({ clipPath: 'circle(100% at 50% 25%)' }))
      ])
    ]),
  ]
})
export class BottomSheetSideComponent {

  //Prodotti selezionati
  sideSelected = input.required<Prodotti>()
  fries !: Prodotti 
  salsa !: Prodotti 

  //liste prodotti
  sideList !: Prodotti[]   //prodotti della categoria del sideSelected
  sauceList : Prodotti[] = this.lingSer.getProduct()    //lista salse
  suportList : Prodotti[] = this.lingSer.getProduct() 

  //suporto 
  quantita : number = 1 // numero del prodotto ordinato 
  salsaSelezionata : boolean = false
  patatineSelezionata : boolean = false

  //lingua
  chose : string = this.lingSer.getTesto().chose
  done : string = this.lingSer.getTesto().Fatto
  curency : string = this.lingSer.getTesto().Curency

  //animazioni
  bottomSideAperto: boolean = false
  hiddenCenter: boolean = true
  hidden: boolean = false
  bounceIncrementazione : boolean = false
  popSelezione : boolean  = false 
  
  //subscription
  subLanguage !: Subscription
  subBottomSide !: Subscription

  constructor(
    public lingSer : ChangeLanguagesService,
    private btsServ : BottomSheetOpenCloseService,
    private overlay : OverlayService,
    private lDServ : LightDarkServiceService,
    private pasBill : PassagioBillService
  ){
    effect(() => {
      this.sauceList = this.sauceList.filter((c) => c.category  === this.lingSer.getCategory()[9].name) //stessa cosa specificatemente per le salse 
    });
  }

  ngOnInit(): void {
    //Cambio Lingua
    this.subLanguage = this.lingSer.cambioLingua.subscribe(() => {
      this.chose = this.lingSer.getTesto().chose
      this.done = this.lingSer.getTesto().Fatto
      this.curency = this.lingSer.getTesto().Curency
      this.sideList.forEach(si => {
        si.item = this.lingSer.changeProd(si.image)         
      });
      
      this.sauceList.forEach(sa => {
        sa.item = this.lingSer.changeProd(sa.image)         
      });
    });
    //bottom sheet 
    this.subBottomSide = this.btsServ.sideChange.subscribe(() => {
      this.bottomSideAperto = this.btsServ.bottomSideAperto
      this.hiddenCenter = this.btsServ.hiddenCenter
      this.hidden = this.btsServ.hidden
      setTimeout(() => {
      if(this.bottomSideAperto == true){
        this.suportList = this.lingSer.getProduct()
        this.suportList = this.suportList.filter((c) => c.category === this.lingSer.getCategory()[4].name)
        const index = this.suportList.findIndex(obj => obj.item === this.sideSelected().item);
        if (index <= 2) {  

          //cambia nelle lingue

          this.suportList.splice(3, 3);
        
        } 
        else{
          this.suportList.splice(0, 3);
        }
        this.sideList = this.suportList
        this.setPatatine(this.sideSelected())
      } 
    },0);
    });
  }

  //selezione prodotti
  setPatatine(p: Prodotti) {
    this.fries = p;
    this.quantita = 1
    this.patatineSelezionata = true
    this.popSelezione = true
  }
  setSalsa(p: Prodotti) {
    this.salsa = p;
    this.salsaSelezionata = true
  }

  //cambio css prodotto in base alla selezione
  
  //patatine
  getColorFries(p : Prodotti){
    if(p.image == this.fries.image){
      return  'rgb(200, 22, 29)'
    }
    return this.getBackgroundColor()
  }
  getScaleFires(p : Prodotti){
    if(p.image == this.fries.image){
      return  1.5
    }
    return 1.3
  }
  //salse
  getColorSalsa(p : Prodotti){
    if(p === this.salsa){
      return this.getBackgroundColor()
    }
    return this.rCBackground()
  }
  getBorderSalsa(p : Prodotti){
    if(p === this.salsa){
      return 'none'
    }
    return 'solid 1px gray'
  }
  getMarginTopTxtSalsa(p:Prodotti){
    if(p === this.salsa){
      return 'block'
    }
    return 'none'
  }

  //pulsanti + e -
  plus(){
    this.quantita++;
    this.bounce()
  }

  minus(){
    if (this.quantita > 1) {
      this.quantita--;
    }
  } 


  // chiusura
  close(): void { 
    this.btsServ.bottomSideClosed()
    this.overlay.switch();
    this.quantita = 1
    this.salsaSelezionata = false 
    this.salsa = {
      item : '', 
      price : 0, 
      image : '',
      category : '', 
      sconto : 0,
      toppings : []
    }
    setTimeout(() => {
      this.patatineSelezionata = false;
      this.popSelezione = false
    }, 270);
  }

  // tasto done
  fatto(){
    if(this.salsaSelezionata){    
      this.pasBill.setProd(this.salsa , 1)
    }
    this.pasBill.setProd(this.fries , this.quantita)
    this.hCF()
    this.close()
  }

  // animazioni
  hCF(){
    this.btsServ.hiddenCenterFalse()
  }
  bounce(){
    this.bounceIncrementazione = true;
    setTimeout(() => {
      this.bounceIncrementazione = false;
    }, 150);    
  }

  //Palette di colori
  getBackgroundColor(){
    return this.lDServ.backgroundBlack()
  }
  getTestiColor(){
    return this.lDServ.testi()
  }
  rCBackground(){
    return this.lDServ.background2()
  }
}

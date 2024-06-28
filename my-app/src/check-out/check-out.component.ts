import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { LanguageComponent } from "../language/language.component";
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';
import { ProdCheckOutComponent } from "../prod-check-out/prod-check-out.component";
import { InfoBillService } from '../Service/info-bill.service';
import { BillProd } from '../Bill/bill-prod';
import { StartButtonComponent } from '../start-button/start-button.component';
import { ContoService } from '../Service/conto.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CheckOutServiceService } from '../Service/check-out-service.service';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { ModalitaConsumoService } from '../Service/modalita-consumo.service';
import { LightDarkServiceService } from '../Service/light-dark-service.service';

registerLocaleData(localeIt)
registerLocaleData(localeEn)



@Component({
    selector: 'check-out',
    standalone: true,
    templateUrl: './check-out.component.html',
    styleUrl: './check-out.component.css',
    imports: [RouterLink, RouterOutlet, MainPageComponent, LanguageComponent, ProdCheckOutComponent,CurrencyPipe , CommonModule],
    animations: [
      trigger('holeState', [
        state('shown', style({
          clipPath: 'circle(100% at 50% 50%)',
          pointerEvents: 'auto'
        })),
        state('hidden', style({
          clipPath: 'circle(5% at 50% 50%)',
          pointerEvents: 'none'
        })),
        transition('shown => hidden', animate('0.2s linear')),
        transition('hidden => shown', animate('0.2s linear'))
      ]),

      trigger('entrataMenu', [
        state('start', style({ transform: 'translateY(-120%)' })),
        state('end', style({ transform: 'translateY(0%)'})),
        transition('start => end', [
          animate('700ms ease-in',),
        ]),
        transition('end => start', [
          animate('700ms ease-in',)
        ])
      ]),
    ]
  })
export class CheckOutComponent {
  //scritta eat in take out
  flagInOut : number = this.servButton.getBottone();

  //lingua
  my: string =  this.lingSer.getTesto().Mio;
  order: string = this.lingSer.getTesto().Ord;
  TakeOut : string =  this.lingSer.getTesto().TakeOut;
  EatIn : string =  this.lingSer.getTesto().EatIn;
  tot : string = this.lingSer.getTesto().TOT; 
  check : string = this.lingSer.getTesto().check; 
  cur : string = this.lingSer.getTesto().Curency; 
  back: string = this.lingSer.getTesto().back
  done : string = this.lingSer.getTesto().Fatto
  
  //suporto
  conto : number = this.infoBill.getConto() 
  scontrino !: BillProd[];
  appogioCalcolo!:number 

  //menu edit
  indexMenu : number = 0
  suportoMenu : BillProd = {
    quantita: 0,
    item: '',
    price: 0,
    image: '',
    category: '',
    sconto: 0
  }

  //animazione 
  entrata: boolean = false
  entrataEdit = true
  
  constructor(
    private lDServ : LightDarkServiceService,
    private lingSer : ChangeLanguagesService,
    private infoBill : InfoBillService,
    private servCont: ContoService, 
    private servButton : ModalitaConsumoService,   //modalita di consumo(scritta eat in take out)
    private cOServ: CheckOutServiceService,         
    
    // Rotuting
    private router: Router
  ){
    this.scontrino = this.infoBill.getAcquisti()
    this.conto = this.calcoloConto()
    setTimeout(() => {
      this.cOServ.InEntrata()
    },1);
  }

  //subscription
  subLanguage !: Subscription;
  subBill !: Subscription;
  subAnimamzioneRouting !: Subscription;
  subConto !: Subscription; 

  ngOnInit(): void { 
    //Cambio lingua 
    this.subLanguage = this.lingSer.cambioLingua.subscribe(() => { 
      this.my =  this.lingSer.getTesto().Mio
      this.order = this.lingSer.getTesto().Ord
      this.TakeOut =  this.lingSer.getTesto().TakeOut;
      this.EatIn =  this.lingSer.getTesto().EatIn;
      this.back = this.lingSer.getTesto().back
      this.done = this.lingSer.getTesto().Fatto
      this.tot = this.lingSer.getTesto().TOT;
      this.check = this.lingSer.getTesto().check;
      this.cur = this.lingSer.getTesto().Curency;
    });

    //ottiene conto e prodotti dal bill
    this.subBill = this.infoBill.infoBill.subscribe(() => { 
      this.scontrino = this.infoBill.getAcquisti()
      this.conto = this.infoBill.getConto()
    });

    //aggiorna il contatore prezzo quando avviene un evento
    this.subConto = this.servCont.aggContFinal.subscribe(() => { 
      this.conto =  this.calcoloConto()
      this.infoBill.setConto(this.conto)
    });

    //per avviare lanimazione da un altra paggina viene usato un service
    this.subAnimamzioneRouting = this.cOServ.entrataChange.subscribe(() => { 
      this.entrata = this.cOServ.entrata
    });
  }

  //tasto back
  passagioMainPage(){
    this.cOServ.InUscita()
    this.infoBill.setAcquisti(this.scontrino)
    this.infoBill.aggiorna()
  }  
  resetBill(){
    this.infoBill.reset()
  }
  delayedNavigation(event: Event) {
    event.preventDefault();
    this.resetBill();
    setTimeout(() => {
      this.router.navigate(['/MainScreen']);
    }, 200);
  }

  //funzionalita
  rimuoviProdotto(pr: BillProd) {
    for(let i=0 ; i <= this.scontrino.length ; i++){
      if(this.scontrino[i].image == pr.image){
        this.scontrino.splice(i,1)
        break;
      }
    }
  }
  calcoloConto(): number {
    this.appogioCalcolo = 0; 
    this.scontrino.forEach(e => {
      this.appogioCalcolo += e.price * e.quantita; 
    });
    return this.appogioCalcolo
  }

  

  //funzioni edit
  startEdit(b : BillProd){
    this.entrataEdit = false
    this.indexMenu = this.scontrino.findIndex(obj => obj.item == b.item);
    this.suportoMenu = {...this.scontrino[this.indexMenu]}
  }

  closeEdit(){
    this.entrataEdit = true
  }

  doneEdit(){
    this.scontrino[this.indexMenu] = {...this.suportoMenu}
    this.closeEdit()
    this.servCont.agiornaContoFinal()
  }

  calcoloPrezzo(b : BillProd){
    return 99 //place older
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

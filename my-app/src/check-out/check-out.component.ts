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
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CheckOutServiceService } from '../Service/check-out-service.service';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeIt)
registerLocaleData(localeEn)



@Component({
    selector: 'check-out',
    standalone: true,
    templateUrl: './check-out.component.html',
    styleUrl: './check-out.component.css',
    imports: [RouterLink, RouterOutlet, MainPageComponent, LanguageComponent, ProdCheckOutComponent,CurrencyPipe],
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
      ])
    ]
  })
export class CheckOutComponent {
  
  flagInOut : number = this.pulsante.getIndice();

  my: string =  this.lingSer.getTesto().Mio;
  order: string = this.lingSer.getTesto().Ord;
  TakeOut : string =  this.lingSer.getTesto().TakeOut;
  EatIn : string =  this.lingSer.getTesto().EatIn;
  tot : string = this.lingSer.getTesto().TOT; 
  check : string = this.lingSer.getTesto().check; 
  cur : string = this.lingSer.getTesto().Curency; 
  conto : number = this.infoBill.getConto() 
  scontrino !: BillProd[];
  entrata: boolean = false
  
  
  constructor(
    private lingSer : ChangeLanguagesService,
    private infoBill : InfoBillService,
    private servCont: ContoService, 
    private pulsante: StartButtonComponent, 
    private cOServ: CheckOutServiceService,
    private router: Router
  ){
    this.scontrino = this.infoBill.getAcquisti()
    this.conto = this.calcoloConto()
    setTimeout(() => {
      this.cOServ.InEntrata()
    },1);
  }

  subscription !: Subscription;
  subscription2 !: Subscription;
  subAnim !: Subscription;
  subConto !: Subscription; 

  ngOnInit(): void {  
    this.subscription = this.lingSer.cambioLingua.subscribe(() => { 
      this.my =  this.lingSer.getTesto().Mio
      this.order = this.lingSer.getTesto().Ord
      this.TakeOut =  this.lingSer.getTesto().TakeOut;
      this.EatIn =  this.lingSer.getTesto().EatIn;

      this.tot = this.lingSer.getTesto().TOT;
      this.check = this.lingSer.getTesto().check;
      this.cur = this.lingSer.getTesto().Curency;
    });

    this.subscription2 = this.infoBill.infoBill.subscribe(() => { 
      this.scontrino = this.infoBill.getAcquisti()
      this.conto = this.infoBill.getConto()
    });

    this.subConto = this.servCont.aggContFinal.subscribe(() => { 
      this.conto =  this.calcoloConto()
      this.infoBill.setConto(this.conto)
    });

    this.subAnim = this.cOServ.entrataChange.subscribe(() => { 
      this.entrata = this.cOServ.entrata
      console.log(this.entrata)
    });
  }
  rimuoviProdotto(pr: BillProd) {
    for(let i=0 ; i <= this.scontrino.length ; i++){
      if(this.scontrino[i].image == pr.image){
        this.scontrino.splice(i,1)
        break;
      }
    }
  }
  passagioMainPage(){
    this.cOServ.InUscita()
    this.infoBill.setAcquisti(this.scontrino)
    this.infoBill.aggiorna()
  }  

  x!:number 
  calcoloConto(): number {
    this.x = 0; 
    this.scontrino.forEach(e => {
      this.x += e.price * e.quantita; 
    });
    return this.x
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
}

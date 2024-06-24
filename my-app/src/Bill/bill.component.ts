import { CurrencyPipe, registerLocaleData } from "@angular/common";
import { Component, OnInit, input } from "@angular/core";
import { BillProd } from "./bill-prod";
import { ChangeLanguagesService } from '../Service/change-languages.service';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { Subscription } from "rxjs/internal/Subscription";
import { LightDarkServiceService } from "../Service/light-dark-service.service";
import { ContoService } from "../Service/conto.service";
import { trigger, state, style, animate, transition } from '@angular/animations';

registerLocaleData(localeIt)
registerLocaleData(localeEn)

@Component({
  selector: 'bill',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  animations: [
    trigger('popBillProd', [
      state('start', style({ transform: 'scale(1)'  })),
      state('end', style({ transform: 'scale(0)' })),
      transition('start => end', [
        animate('400ms ease-out', style({ transform: 'scale(0)' }))
      ]),
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

export class BillComponent implements OnInit{
  //Dati del prodotto stampato
  billProd = input.required<BillProd>()

  //controllo animazioen
  animationFlag : boolean = true; 
  bounceIncrementazione : boolean = false
  //lingua
  curency : string = this.lingSer.getTesto().Curency

  //subscription per aggiornamento dinamico service
  subLanguage !: Subscription;

  constructor(
    private lingSer : ChangeLanguagesService,       //cambio lingua service
    private lDServ: LightDarkServiceService,        //cambio day/night service
    private servContoTot: ContoService,           //aggioramento contatore
  ){}

  ngOnInit(): void{
    //aggiornamento lingua
    this.subLanguage = this.lingSer.cambioLingua.subscribe(() => {
      this.curency = this.lingSer.getTesto().Curency
    });
  }


  //modalita day/night 
  getTestiColor(){
    return this.lDServ.testi()
  }
  getBackgroundPulsColor(){
    return this.lDServ.pulsBackground()
  }

  //pulsanti + e -
  add() {
    this.billProd().quantita++;
    this.servContoTot.agiornaContatore();
    this.bounceIncrementazione = true;
    setTimeout(() => {
      this.bounceIncrementazione = false;
    }, 150); 
  }

  minus() {
    this.billProd().quantita--;
    if (this.billProd().quantita <= 0) {
      this.startAnimation();
    }
    // setTimeout(() => {    //dal il tempo al animazione di svolgersi prima di eliminare il billProd
    //   this.servContoTot.agiornaContatore();
    // } , 400);
    this.servContoTot.agiornaContatore();
  }

  //start aimazione rimozioen
  startAnimation(){
    this.animationFlag = false 
  }
}
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { LanguageComponent } from "../language/language.component";
import { BillComponent } from "../Bill/bill.component";
import { CurrencyPipe, registerLocaleData } from "@angular/common";
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from "@angular/router";
import { CheckOutComponent } from "../check-out/check-out.component";
import { LightDarkServiceService } from "../Service/light-dark-service.service";
import { ChangeLanguagesService } from "../Service/change-languages.service";
import { Subscription } from "rxjs/internal/Subscription";
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { StartButton } from '../start-button/start-button';
import { StartButtonComponent } from '../start-button/start-button.component';
import { BillProd } from "../Bill/bill-prod";
import { InfoBillService } from "../Service/info-bill.service";
import { ContoService } from "../Service/conto.service";
import { PassagioBillService } from "../Service/passagio-bill.service";
import { ModalitaConsumoService } from "../Service/modalita-consumo.service";
registerLocaleData(localeIt)
registerLocaleData(localeEn)


@Component({
  selector: 'right-col',
  standalone: true,
  templateUrl: './right-col.component.html',
  styleUrl: './right-col.component.css',
  imports: [BillComponent, LanguageComponent, CurrencyPipe, RouterOutlet, RouterLink, CheckOutComponent,StartButtonComponent]
})

export class RightColComponent implements OnInit{

  //manipolare il dom per portare lo scroll a 0
  @ViewChild('scroll') scroll !: ElementRef;

  // variabili per la lingua
  my : String =  this.lingSer.getTesto().Mio
  order : String = this.lingSer.getTesto().Ord
  total : String = this.lingSer.getTesto().TOT
  done : String = this.lingSer.getTesto().Fatto
  curency : String = this.lingSer.getTesto().Curency
  modConsumo : String = this.modCons()
  
  //varibili dello startButton per takeOut/eatIn
  pulsantiStart!: StartButton[];
  indexStart!: number;

  //subscripscion per i service
  subLanguage !: Subscription
  subContoTot !: Subscription
  subCheck_Bill !: Subscription
  subProd_Bill !: Subscription
  
  //Dati del bill;
  billList : BillProd [] = []
  conto : number = this.checkOut_Bill.getConto(); 
  flagProd_Bill : boolean = true

  fattoClick: boolean = false


  constructor(
    //service
    private lDServ: LightDarkServiceService, //  modalita notte e giorno
    private lingSer : ChangeLanguagesService, // lingua
    private checkOut_Bill : InfoBillService,     // passagio e ricezione checkout
    private servContoTot: ContoService,            //aggiornare il conto 
    private prod_bill: PassagioBillService,        //aggiungere al bill dal bottom-sheet
    private servButton : ModalitaConsumoService,   //modalita di consumo(scritta eat in take out)
    //Routing
    private router: Router,
    private route: ActivatedRoute
  ){  
    this.billList = this.checkOut_Bill.getAcquisti()   //otenere modifiche fatte dal checkout
  }

  ngOnInit() : void {  
    //dichiarazioni base
    this.servContoTot.agiornaContatore()
    
    //Aggiornamento dinamico lingua
    this.subLanguage = this.lingSer.cambioLingua.subscribe(() => {
      this.billList.forEach(b => {
        b.item = this.lingSer.changeProd(b.image)
      });
      
      this.my =  this.lingSer.getTesto().Mio
      this.order = this.lingSer.getTesto().Ord
      this.total = this.lingSer.getTesto().TOT
      this.done = this.lingSer.getTesto().Fatto
      this.curency = this.lingSer.getTesto().Curency
      this.modConsumo = this.modCons()
    });

    //Aggiornamento conto alla premuta di un tasto piu o meno
    this.subContoTot = this.servContoTot.aggCont.subscribe(() => {
      this.conto = 0; 
      //vengono usati 2 for each distinti per evitare problemi datti dal funzioanento dello splice
      this.billList.forEach((b , index) => {
          if(b.quantita <= 0){
            this.billList.splice(index, 1);
          }                               
      });
      this.billList.forEach(b => {
        this.conto += b.price * b.quantita;
      })   
     this.checkOut_Bill.setConto(this.conto);  
    });

    //aggiornamento bill al passagio da checkout a bill
    this.subCheck_Bill = this.checkOut_Bill.infoBill.subscribe(() => {
      this.billList = this.checkOut_Bill.getAcquisti();
      this.servContoTot.agiornaContatore()
      this.GoToTop()
    });

    //passagio prodotti al bill
    this.subProd_Bill = this.prod_bill.ProdChange.subscribe(() => {
      const billProd = this.prod_bill.getBillProd();
      this.billList.forEach((b , index)=> {
        if(b == billProd  ){
          b.quantita += billProd.quantita
          if(index != 0){
            this.billList.splice(index, 1);
            this.billList.unshift(b) 
          }
          this.flagProd_Bill = false 
        }
      });
      if(this.flagProd_Bill){
        this.billList.unshift(billProd);
      }
      this.flagProd_Bill = true ; 
      this.servContoTot.agiornaContatore();
      this.GoToTop()
    });
  }
  ngOnDestroy(): void {
    this.subProd_Bill.unsubscribe();
    this.subLanguage.unsubscribe();
    this.subCheck_Bill.unsubscribe();
    this.subContoTot.unsubscribe()
  }

  //funzione che riporta lo scroll a 0
  GoToTop() {
    this.scroll.nativeElement.scrollTop = 0;
  }

  //passagio bill al check out
  passagioCheckOut(){
    this.fattoClick= true
    setTimeout(() => {
      this.fattoClick= false
    }, 100);
    this.checkOut_Bill.setAcquisti(this.billList)
    this.checkOut_Bill.setConto(this.conto); 
    this.checkOut_Bill.aggiorna()
  }
  checkout(){
    if(this.billList.length > 0){  
      this.router.navigate(['CheckOut'], {relativeTo:this.route});
    }
  }

  //testo dello start button
  modCons() : String{
    if(this.servButton.getBottone() == 0 ){
      return this.lingSer.getTesto().EatIn
    }
    return this.lingSer.getTesto().TakeOut
  }

  //modalita day night  
  rCBackground(){
    return this.lDServ.background2()
  }
  getTestiColor(){
    return this.lDServ.testi()
  }
  
  //colore tanto done
  getPosibilitaPremuta(){
    if(this.fattoClick && this.billList.length <= 0){
      return '#ebb52f'
    }
    return (this.lDServ.darkMode)? '#ffbd18': '#FFCA40'
  }
  

}
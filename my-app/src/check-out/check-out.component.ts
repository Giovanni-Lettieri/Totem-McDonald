import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { LanguageComponent } from "../language/language.component";
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';
import { ProdCheckOutComponent } from "../prod-check-out/prod-check-out.component";
import { InfoBillService } from '../Service/info-bill.service';
import { BillProd } from '../Bill/bill-prod';


@Component({
    selector: 'check-out',
    standalone: true,
    templateUrl: './check-out.component.html',
    styleUrl: './check-out.component.css',
    imports: [RouterLink, RouterOutlet, MainPageComponent, LanguageComponent, ProdCheckOutComponent]
})

export class CheckOutComponent {
  
  my: string =  this.lingSer.getTesto().Mio;
  order: string = this.lingSer.getTesto().Ord;
  flagInOut : boolean = false   //FARE UN SARVICE TAKE IN TAKE OUT E CAMBIARE QUELLO DI MAIN PAGE
  TakeOut : string =  this.lingSer.getTesto().TakeOut;
  EatIn : string =  this.lingSer.getTesto().EatIn;

  scontrino !: BillProd[];
  
  constructor(
    private lingSer : ChangeLanguagesService,
    private infoBill : InfoBillService
  ){
    this.scontrino = infoBill.getAcquisti()
  }

  subscription !: Subscription;
  subscription2 !: Subscription;

  ngOnInit(): void {  
    this.subscription = this.lingSer.cambioLingua.subscribe(() => { 
      this.my =  this.lingSer.getTesto().Mio
      this.order = this.lingSer.getTesto().Ord
      this.TakeOut =  this.lingSer.getTesto().TakeOut;
      this.EatIn =  this.lingSer.getTesto().EatIn;
    });
    this.subscription2 = this.infoBill.infoBill.subscribe(() => { 
      this.scontrino = this.infoBill.getAcquisti()
    });
  }
  
  passagioMainPage(){
    //this.infoBill.setAcquisti(this.scontrino)
  }

  
}

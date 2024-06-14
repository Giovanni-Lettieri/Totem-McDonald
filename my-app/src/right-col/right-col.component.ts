import { Component , OnInit} from '@angular/core';
import { BillComponent } from '../Bill/bill.component';
import { Subscription } from 'rxjs';
import { ContoService } from '../Service/conto.service';
import { LanguageComponent } from "../language/language.component";
import { StartButton } from '../start-button/start-button';
import { StartButtonComponent } from '../start-button/start-button.component';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { BillProd } from '../Bill/bill-prod';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

registerLocaleData(localeIt)
registerLocaleData(localeEn)

@Component({
    selector: 'right-col',
    standalone: true,
    templateUrl: './right-col.component.html',
    styleUrl: './right-col.component.css',
    imports: [BillComponent, LanguageComponent,CurrencyPipe,RouterOutlet , RouterLink],

})

export class RightColComponent implements OnInit{
  
  my : String =  this.lingSer.getTesto().Mio
  order : String = this.lingSer.getTesto().Ord
  total : String = this.lingSer.getTesto().TOT
  done : String = this.lingSer.getTesto().Fatto
  Cur : String = this.lingSer.getTesto().Curency

  pulsanti!: StartButton[];
  billDerivato !: BillProd[]
  indice!: number;
  conto : number = 0;
  
  subscription !: Subscription;
  subscription2 !: Subscription;

  constructor(
    private servCont: ContoService, 
    private pulsante: StartButtonComponent,
    private lingSer : ChangeLanguagesService, 
  ) {}
  
  riceviBill(b : BillProd[]){
    this.billDerivato = b
  }

  ngOnInit(): void {  
    
    this.pulsanti = this.pulsante.getPulsante();
    this.indice = this.pulsante.getIndice();
    
    // aggiornamento bill list
    this.subscription = this.servCont.aggCont.subscribe(() => {
      this.conto = 0; 
      this.billDerivato.forEach(b => {
        this.conto += b.price * b.quantita;
      }); 
    });

    //aggiornamento lingua
    this.subscription2 = this.lingSer.cambioLingua.subscribe(() => {
      this.my =  this.lingSer.getTesto().Mio
      this.order = this.lingSer.getTesto().Ord
      this.total = this.lingSer.getTesto().TOT
      this.done = this.lingSer.getTesto().Fatto
      this.Cur = this.lingSer.getTesto().Curency
    });
  }  
}



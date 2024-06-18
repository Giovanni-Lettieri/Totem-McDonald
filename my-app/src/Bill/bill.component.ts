import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BillProd } from './bill-prod';
import { PassagioBillService } from '../Service/passagio-bill.service';
import { ContoService } from '../Service/conto.service';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Prodotti } from '../prodotti/prodotti';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { InfoBillService } from '../Service/info-bill.service';

registerLocaleData(localeIt)
registerLocaleData(localeEn)

@Component({
  selector: 'bill',
  standalone: true,
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  

  BillList: BillProd[] = [];
  pSuport : Prodotti[] = this.lingSer.getProduct(); 
  prodottiSub !: Subscription;
  linguaSub !: Subscription;
  checkOutSub !: Subscription; 
  controllo : boolean = true;
  Cur : string = this.lingSer.getTesto().Curency
  
  constructor(
    private service: PassagioBillService,
    private servCont: ContoService,
    private lingSer : ChangeLanguagesService,
    private infoBill : InfoBillService
  ){
    this.BillList = this.infoBill.getAcquisti(); 

  }
  
  ngOnInit(): void { 
    this.servCont.agiornaContatore()
    this.prodottiSub = this.service.ProdChange.subscribe(() => {
      const billProd = this.service.getBillProd();
      this.BillList.forEach(b => {
        if(b.image == billProd.image){
          b.quantita += billProd.quantita
          this.controllo = false 
        }
      });
      if(this.controllo){
        this.BillList.unshift(billProd);
      }
      this.controllo = true ; 
      this.MandaBill.emit(this.BillList);
      this.servCont.agiornaContatore();
      
    });

    this.linguaSub = this.lingSer.cambioLingua.subscribe(() => {
      this.Cur = this.lingSer.getTesto().Curency
      this.pSuport = this.lingSer.getProduct(); 
      this.BillList.forEach(b => {
        for(let i = 0; i < this.pSuport.length; i++){
          if(b.image == this.pSuport[i].image){
            b.item = this.pSuport[i].item;
            break;
          }
        }
      });
    });
    this.checkOutSub = this.infoBill.infoBill.subscribe(() => {
      this.BillList = this.infoBill.getAcquisti(); 
    });
    
  }

  ngOnDestroy(): void {
    this.prodottiSub.unsubscribe();
    this.linguaSub.unsubscribe();
    this.checkOutSub.unsubscribe();
  }
  
  @Output() MandaBill = new EventEmitter<BillProd[]>();

  add(b: BillProd) {
    b.quantita++;
    this.servCont.agiornaContatore();
  }

  minus(b: BillProd, i: number) {
    b.quantita--;
    if (b.quantita <= 0) {
      this.BillList.splice(i, 1);
    }
    this.servCont.agiornaContatore();
  }

  
}

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
  subscription !: Subscription;
  subscription2 !: Subscription;
  controllo : boolean = true;
  Cur : string = this.lingSer.getTesto().Curency
  
  constructor(
    private service: PassagioBillService,
    private servCont: ContoService,
    private lingSer : ChangeLanguagesService
  ){}

  ngOnInit(): void {  
    this.subscription = this.service.ProdChange.subscribe(() => {
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
      this.controllo = true 
      this.MandaBill.emit(this.BillList)
      this.servCont.agiornaContatore();
      
    });
    this.subscription2 = this.lingSer.cambioLingua.subscribe(() => {
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
  }
  
  @Output() MandaBill = new EventEmitter<BillProd[]>();

  add(b: BillProd) {
    b.quantita++;
    this.servCont.agiornaContatore();
  }

  remove(b: BillProd, i: number) {
    b.quantita--;
    if (b.quantita <= 0) {
      this.BillList.splice(i, 1);
    }
    this.servCont.agiornaContatore();
  }

  
}

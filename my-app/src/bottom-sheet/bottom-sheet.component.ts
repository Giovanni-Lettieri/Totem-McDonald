import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PassagioBillService } from '../Service/passagio-bill.service';
import { Prodotti } from '../prodotti/prodotti';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { Subscription } from 'rxjs';
import { OverlayService } from '../Service/overlay.service';

registerLocaleData(localeIt)
registerLocaleData(localeEn)


@Component({
  selector: 'app-bottom-sheet-content',
  standalone: true,
  imports: [CommonModule, MatButtonModule,CurrencyPipe],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css'],
})
export class BottomSheetComponent {
  
  
  subscription !: Subscription;
  Cur: string = this.lingSer.getTesto().Curency;
  fatto : string = this.lingSer.getTesto().Fatto;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Prodotti,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private service: PassagioBillService ,
    private lingSer : ChangeLanguagesService,
    private overlay: OverlayService
  ){}

  quantita : number = 1

  close(): void {
    this.bottomSheetRef.dismiss();
    this.overlay.switch()
  }

  setProd(p: Prodotti , q:number){
    this.service.setProd(p,q);
    this.close();
  }

  plus() {  
      this.quantita++;   
  }
  minus() {
    if(this.quantita > 1){
      this.quantita--;
    }
  }

  src !: String;
  pSuport !: Prodotti[]
  ngOnInit(): void {   
    this.subscription = this.lingSer.cambioLingua.subscribe(() => {
      this.Cur = this.lingSer.getTesto().Curency
      this.fatto = this.lingSer.getTesto().Fatto;
      //aggiorna data
      this.src = this.data.image
      this.pSuport = this.lingSer.getProduct();
      for(let i = 0; i < this.pSuport.length ; i++){
        if(this.data.image == this.pSuport[i].image){
          this.data.item = this.pSuport[i].item;
          break;
        }
      }
    });  
  }

}

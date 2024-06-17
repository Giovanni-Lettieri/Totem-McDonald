import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PassagioBillService } from '../Service/passagio-bill.service';
import { Prodotti } from '../prodotti/prodotti';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { ProdottiService } from '../Service/prodotti.service';
import { Subscription } from 'rxjs';
import { OverlayService } from '../Service/overlay.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeIt);
registerLocaleData(localeEn);

@Component({
  selector: 'app-bottom-sheet-content',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CurrencyPipe],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css'],
  animations: [
    trigger('slideAnimation', [
      state('hidden', style({ transform: 'translateX(100%)', opacity: 0 })),
      state('visible', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('hidden => visible', animate('300ms ease-in')),
      transition('visible => hidden', animate('300ms ease-out')),
    ])
  ]
})
export class BottomSheetComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  Cur: string = this.lingSer.getTesto().Curency;
  fatto: string = this.lingSer.getTesto().Fatto;
  comMeal: string = this.lingSer.getTesto().CM;
  prodList!: Prodotti[];
  _adAtt: number = 0;
  quantita: number = 1;
  src!: String;
  pSuport!: Prodotti[];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Prodotti,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private service: PassagioBillService,
    private lingSer: ChangeLanguagesService,
    private prodottiService: ProdottiService,
    private overlay: OverlayService
  ) {
    this.prodList = prodottiService.getCM();
  }

  get adAtt(): number {
    return this._adAtt;
  }

  set adAtt(value: number) {
    if (value !== this._adAtt) {
      this._adAtt = value;
    }
  }

  close(): void {
    this.bottomSheetRef.dismiss();
    this.overlay.switch();
  }

  setProd(p: Prodotti, q: number) {
    this.service.setProd(p, q);
    this.close();
  }

  plus() {
    this.quantita++;
  }

  minus() {
    if (this.quantita > 1) {
      this.quantita--;
    }
  }

  ngOnInit(): void {
    setInterval(() => {
      this.adAtt = (this.adAtt + 1) % this.prodList.length;
    }, 5000);

    this.subscription = this.lingSer.cambioLingua.subscribe(() => {
      this.Cur = this.lingSer.getTesto().Curency;
      this.fatto = this.lingSer.getTesto().Fatto;
      this.src = this.data.image;
      this.pSuport = this.lingSer.getProduct();
      for (let i = 0; i < this.pSuport.length; i++) {
        if (this.data.image === this.pSuport[i].image) {
          this.data.item = this.pSuport[i].item;
          break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

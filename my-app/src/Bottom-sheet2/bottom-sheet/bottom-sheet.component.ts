import { Component, Inject, OnInit, OnDestroy, ViewContainerRef, input } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PassagioBillService } from '../../Service/passagio-bill.service';
import { Prodotti } from '../../prodotti/prodotti';
import { ChangeLanguagesService } from '../../Service/change-languages.service';
import { ProdottiService } from '../../Service/prodotti.service';
import { Subscription } from 'rxjs';
import { OverlayService } from '../../Service/overlay.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LightDarkServiceService } from '../../Service/light-dark-service.service';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { BottomSheetOpenCloseService } from '../../Service/bottom-sheet-open-close.service';

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
    ]),

    trigger('andataAlBIll', [
      state('start', style({ transform: 'translateX(0%) translateY(0%) scale(1)' })),
      state('end', style({ transform: 'translateX(60%) translateY(-20%) scale(0.2)'})),
      transition('start => end', [
        animate('250ms ease-out', style({ transform: 'translateX(60%) translateY(-20%) scale(0.2)' }))
      ]),
    ]),
    trigger('holeState', [
      state('shown', style({
        clipPath: 'circle(100% at 60% 35%)',
        pointerEvents: 'auto'
      })),
      state('hidden', style({
        clipPath: 'circle(5% at 85% 15%)',
        pointerEvents: 'none'
      })),
      transition('shown => hidden', animate('0.2s linear')),
      transition('hidden => shown', animate('0.2s linear'))
    ])
  ]
})
export class BottomSheetComponent implements OnInit, OnDestroy {
  // Variabili
  viewContainerRef: ViewContainerRef | undefined;
  subscription!: Subscription;
  Cur: string = this.lingSer.getTesto().Curency;
  fatto: string = this.lingSer.getTesto().Fatto;
  comMeal: string = this.lingSer.getTesto().CM;
  prodList!: Prodotti[];
  _adAtt: number = 0;
  quantita: number = 1;
  src!: String;
  pSuport!: Prodotti[];
  data = input.required<Prodotti>()
  bottomSheetAperto!: boolean
  vadoAlBill : boolean = true;

  subscriptionBottomSheet!: Subscription

  vacciAlBill(){
    this.vadoAlBill = false
  }
  constructor(
    private service: PassagioBillService,
    private lingSer: ChangeLanguagesService,
    private prodottiService: ProdottiService,
    private overlay: OverlayService,
    private lDServ: LightDarkServiceService,
    private btsServ: BottomSheetOpenCloseService
  ) {
    this.prodList = prodottiService.getCM();
  }

  // Pubblicità
  get adAtt(): number {
    return this._adAtt;
  }

  set adAtt(value: number) {
    if (value !== this._adAtt) {
      this._adAtt = value;
    }
  }

  //Chiusura bottom sheet
  close(): void { 
    this.btsServ.bottomSheetClosed()
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

  //Cambio bottom sheet con ad
  goToAdd(p: Prodotti) {
    this.btsServ.bottomSheetClosed();
    //Senza non va
    setTimeout(() => {
      this.btsServ.setC(p);
      this.btsServ.bottomSheetOpened();
    },200);
  }

  ngOnInit(): void {
    //Cambio ad
    setInterval(() => {
      this.adAtt = (this.adAtt + 1) % this.prodList.length;
    }, 5000);

    //Cambio Lingua
    this.subscription = this.lingSer.cambioLingua.subscribe(() => {
      this.Cur = this.lingSer.getTesto().Curency;
      this.fatto = this.lingSer.getTesto().Fatto;
      this.src = this.data().image;
      this.pSuport = this.lingSer.getProduct();
      for (let i = 0; i < this.pSuport.length; i++) {
        if (this.data().image === this.pSuport[i].image) {
          this.data().item = this.pSuport[i].item;
          break;
        }
      }
    });
    this.subscriptionBottomSheet = this.btsServ.bTAChange.subscribe(() => {
      this.bottomSheetAperto = this.btsServ.bottomSheetAperto
      this.vadoAlBill = this.btsServ.vaiAlBill
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
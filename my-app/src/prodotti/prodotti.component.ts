import { Component, HostListener, ViewContainerRef, effect, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prodotti } from './prodotti';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { ProdottiService } from '../Service/prodotti.service';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { OverlayService } from '../Service/overlay.service';

registerLocaleData(localeIt)
registerLocaleData(localeEn)


@Component({
  selector: 'app-prodotti',
  standalone: true,
  imports: [CommonModule, MatBottomSheetModule, MatButtonModule,CurrencyPipe],
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})


export class ProdottiComponent implements OnInit{
  Cur : string = this.lingSer.getTesto().Curency
  ProductList: Prodotti[] = this.lingSer.getProduct();
  categoriaAttuale = input.required<string>();
  prodottiAttuali!: Prodotti[];
  viewContainerRef: ViewContainerRef | undefined;

  constructor(
    private bottomSheet: MatBottomSheet, 
    private prodottiService: ProdottiService, 
    private lingSer : ChangeLanguagesService,
    private overlay: OverlayService
  ){
    effect(() => {
      this.prodottiAttuali = this.ProductList.filter((c) => c.category === this.categoriaAttuale());
    });
    this.prodottiService.randomizeProdotti();
  }
  
  subscription !: Subscription;

  ngOnInit(): void {  
    
    this.subscription = this.lingSer.cambioLingua.subscribe(() => {
      
      this.Cur = this.lingSer.getTesto().Curency
      this.prodottiService.pseudoEmit();
      this.ProductList = this.prodottiService.getProdotti();
      this.prodottiAttuali = this.ProductList.filter((c) => c.category === this.categoriaAttuale());
    });  
  }

  pulsanteCliccato: number = -1;

  @HostListener('document:click', ['$event'])
  ClickFuori(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('button') || !target.closest('.contenitore')) {
      this.pulsanteOff();
    }
  }

  pulsanteOn(i: number) {
    this.pulsanteCliccato = i;
    this.openBottomSheet(this.prodottiAttuali[i]);
    this.overlay.switch()
  }

  coloreSfondo(i: number) {
    return this.pulsanteCliccato == i ? '#FFCA40' : 'white';
  }

  coloreTesto(i: number) {
    return this.pulsanteCliccato == i ? '#FFFFFF' : 'black';
  }

  colorePrezzo(i: number) {
    return this.pulsanteCliccato == i ? 'white' : '#FFCA40';
  }

  pulsanteOff() {
    this.pulsanteCliccato = -1;
  }

  openBottomSheet(data: Prodotti): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: data,
      hasBackdrop: false,
      panelClass: 'bottom-sheet',
      viewContainerRef: this.viewContainerRef,
    });
  }
}





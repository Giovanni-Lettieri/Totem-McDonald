import { Component, HostListener, ViewContainerRef, effect, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prodotti } from './prodotti';
import { ProdottiService } from '../Service/prodotti.service';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { BottomSheetOpenCloseService } from '../Service/bottom-sheet-open-close.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { OverlayService } from '../Service/overlay.service';
import { LightDarkServiceService } from '../Service/light-dark-service.service';

registerLocaleData(localeIt)
registerLocaleData(localeEn)


@Component({
    selector: 'app-prodotti',
    standalone: true,
    templateUrl: './prodotti.component.html',
    styleUrl: './prodotti.component.css',
    imports: [CommonModule, CurrencyPipe, BottomSheetComponent]
})


export class ProdottiComponent implements OnInit{
  Cur : string = this.lingSer.getTesto().Curency
  ProductList: Prodotti[] = this.lingSer.getProduct();
  categoriaAttuale = input.required<string>();
  prodottiAttuali!: Prodotti[];
  viewContainerRef: ViewContainerRef | undefined;
  

  constructor(
    private prodottiService: ProdottiService, 
    private lingSer : ChangeLanguagesService,
    private overlay: OverlayService, 
    private lDServ: LightDarkServiceService,
    private btsServ: BottomSheetOpenCloseService
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

  pulsanteOn(c: Prodotti) {
    

    if(c.category === this.lingSer.getCategory()[4].name){
      this.btsServ.bottomSideOpened()   //patatine
    }else{
      this.btsServ.bottomSheetOpened()  //Originale 
    }
    this.btsServ.setC(c)
    this.overlay.switch()
  }

  colorePrezzo(i: number) {
    return this.pulsanteCliccato == i ? 'white' : '#FFCA40';
  }

  pulsanteOff() {
    this.pulsanteCliccato = -1;
  }

  getBackground(){
    return this.lDServ.backgroundBlack()
  }
  getTestiColor(){
    return this.lDServ.testi()
  }

}





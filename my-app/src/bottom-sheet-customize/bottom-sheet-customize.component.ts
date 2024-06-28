import { Component, OnInit, input } from '@angular/core';
import { BottomSheetOpenCloseService } from '../Service/bottom-sheet-open-close.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LightDarkServiceService } from '../Service/light-dark-service.service';
import { Prodotti } from '../prodotti/prodotti';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { ToppingComponent } from '../Topping/topping.component';
import { ToppingService } from '../Service/topping.service';
import { Topping } from './topping';

@Component({
    selector: 'app-bottom-sheet-customize',
    standalone: true,
    templateUrl: './bottom-sheet-customize.component.html',
    styleUrl: './bottom-sheet-customize.component.css',
    animations: [
        trigger('AperturaBottomSheetCustomize', [
            state('invisibile', style({ transform: 'translateY(0%)' })),
            state('visibile', style({ transform: 'translateY(100%)' })),
            transition('invisibile => visibile', [
                animate('300ms ease-out', style({ transform: 'translateY(100%)' }))
            ]),
            transition('visibile => invisibile', [
                animate('300ms ease-in', style({ transform: 'translateY(0%)' }))
            ])
        ])
    ],
    imports: [CommonModule, ToppingComponent]
})

export class BottomSheetCustomizeComponent implements OnInit{
  bottomSheetCustomizeAperto: boolean = false //rileva se il bottom sheet è da aprire o da chiudere
  data = input.required<Prodotti>() //acquisisci il prodotto
  Cur: string = this.lingSer.getTesto().Curency;  //Pipe Currency
  topList!: Topping[]; //Lista dei topping

  subscribeCustomize!: Subscription //rileva i cambi del service e li assegna a bottomSheetCustomizeAperto
  subscribePrezzo!: Subscription //rileva le aggiunte e le aggiunge al prezzo
  prezzo!: number;

  constructor(
    private btsServ: BottomSheetOpenCloseService, 
    private lDServ: LightDarkServiceService,
    private lingSer: ChangeLanguagesService,
    private topServ: ToppingService
  ){
  } 

  ngOnInit(){
    
    this.subscribeCustomize = this.btsServ.BottomSheetCustomize.subscribe(() => {
      this.bottomSheetCustomizeAperto = this.btsServ.bottomSheetCustomizeAperto
      if(this.bottomSheetCustomizeAperto){
        this.topList = [...this.lingSer.getProduct()[this.lingSer.getProduct().findIndex(x => x.item === this.data().item)].toppings]
        this.topServ.setLista([...this.data().toppings])
      }
      this.prezzo = this.data().price //Faccio una copia del prezzo
    });

    this.subscribePrezzo = this.topServ.prezzoChange.subscribe(() => {
        this.prezzo += this.topServ.getPrezzoAggRid();   
    });
  }

  // fun<ione del pulsante di chiusura
  close(): void { 
    this.btsServ.CloseBottomSheetCustomize()
  }
  //pulsanti apply
  apply(): void { 
    this.data().price = this.prezzo
    this.topServ.applyOn()
    this.btsServ.CloseBottomSheetCustomize()
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

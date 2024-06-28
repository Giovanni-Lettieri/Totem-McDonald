import { Component, input } from '@angular/core';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Topping } from '../bottom-sheet-customize/topping';
import { CommonModule } from '@angular/common';
import { LightDarkServiceService } from '../Service/light-dark-service.service';
import { ToppingService } from '../Service/topping.service';
import { Subscription } from 'rxjs';
import { BottomSheetOpenCloseService } from '../Service/bottom-sheet-open-close.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-topping',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topping.component.html',
  styleUrl: './topping.component.css',
  animations: [
    trigger('bounce', [
      state('start', style({ transform: 'translateY(0%)' })),
      state('end', style({ transform: 'translateY(0%)'})),
      transition('start => end', [
        animate('150ms ease-in', style({ transform: 'translateY(-30%)' }))
      ])
    ]),
  ]
})
export class ToppingComponent {
  Cur: string = this.lingSer.getTesto().Curency;  //Pipe Currency
  data = input.required<Topping>() //Lista che raccogliil topping attuale
  subscribeBS!: Subscription //controlla l'apertura del bottom sheet base
  subscribeCustomize!: Subscription //controlla l'apertura del bottom sheet customize
  subscribeApply!: Subscription //controlla l'apertura del bottom sheet customize
  q!: number //quantità del topping
  bounceIncrementazione : boolean = false; 
  listaQ!: number //Salva la quantità iniaziale in caso un panino avesse un topping con quantità 2

  constructor(private lingSer: ChangeLanguagesService,
    private lDServ: LightDarkServiceService,
    private topServ: ToppingService,
    private btsServ: BottomSheetOpenCloseService
  ){
  }


  ngOnInit(): void {

    //resetta quando si chiude il bottom sheet sotto
    this.subscribeBS = this.btsServ.bTAChange.subscribe(() => {
      if(this.btsServ.bottomSheetAperto) {
        this.listaQ = 1
        this.q = this.listaQ
      }
    });
    //Resetta ogni volta che non si preme apply
    this.subscribeCustomize = this.btsServ.BottomSheetCustomize.subscribe(() => {
      if(!this.btsServ.bottomSheetCustomizeAperto){
        this.q = this.data().quantity 
      }else{
        this.listaQ = this.data().quantity
      }
    });
    //Controllo se l'apply viene premuto
    this.subscribeApply = this.topServ.applyEE.subscribe(() => {
      this.topServ.setQuantita(this.q, this.data().name)
    });

    
    this.listaQ = 1
    this.q = this.listaQ
    
  }

  // funzioni pulsanti + e -

  plus(c: string){
    this.q++
    this.bounceIncrementazione = true;
    setTimeout(() => {
      this.bounceIncrementazione = false;
    }, 150);
    if(this.q>this.listaQ){
      this.topServ.AggiuntaPrezzo(this.data().price)
    }
  }

  minus(c: string) {
    if(this.q>0){
      this.q--
      this.topServ.RiduzionePrezzo(this.data().price)
    }
  } 


  // ricerca parametri dei topping
  getTopperImage(c: string){
    return this.data().image
  }
  getTopperPrice(c: string){
    return this.data().price
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

  getQuantity(){
    return this.q
  }
}
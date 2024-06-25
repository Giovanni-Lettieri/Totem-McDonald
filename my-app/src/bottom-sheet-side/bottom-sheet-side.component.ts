import { Component, effect, input } from '@angular/core';
import { Prodotti } from '../prodotti/prodotti';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription, timeout } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { BottomSheetOpenCloseService } from '../Service/bottom-sheet-open-close.service';
import { OverlayService } from '../Service/overlay.service';
import { LightDarkServiceService } from '../Service/light-dark-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Category } from '../category/category';
registerLocaleData(localeIt)
registerLocaleData(localeEn)

@Component({
  selector: 'app-bottom-sheet-side',
  standalone: true,
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './bottom-sheet-side.component.html',
  styleUrl: './bottom-sheet-side.component.css',
  animations:[

  ]
})
export class BottomSheetSideComponent {
  //origine butom shet
  sideSelected = input.required<Prodotti>() //prodotto da cui si e aperto il bottmo sheet e che verra cambiato eventualmente con gli altri
  
  //liste prodotti
  sideList !: Prodotti[]   //prodotti della categoria del sideSelected
  sauceList !: Prodotti[]     //lista salse
  suportList : Prodotti[] = this.lingSer.getProduct() 

  //suporto 
  counter : number = 0 // numero del prodotto ordinato 

  //lingua
  chose : string = this.lingSer.getTesto().chose
  done : string = this.lingSer.getTesto().Fatto
  curency : string = this.lingSer.getTesto().Curency

  //apertura e chiusura bottom sheet side
  bottomSideAperto: boolean = false
  vadoAlBill : boolean = true;
  hiddenCenter: boolean = true
  hidden: boolean = false

  //subscription
  subLanguage !: Subscription
  subBottomSide !: Subscription

  constructor(
    public lingSer : ChangeLanguagesService,
    private btsServ : BottomSheetOpenCloseService,
    private overlay : OverlayService,
    private lDServ : LightDarkServiceService,
  ){
    effect(() => {
      this.sauceList = this.sauceList.filter((c) => c.category  === this.lingSer.getCategory()[9].name) //stessa cosa specificatemente per le salse 
    });
  }

  ngOnInit(): void {
    //Cambio Lingua
    this.subLanguage = this.lingSer.cambioLingua.subscribe(() => {
      this.chose = this.lingSer.getTesto().chose
      this.done = this.lingSer.getTesto().Fatto
      this.curency = this.lingSer.getTesto().Curency

      this.sideList.forEach(si => {
        si.item = this.lingSer.changeProd(si)         
      });
      
      this.sauceList.forEach(sa => {
        sa.item = this.lingSer.changeProd(sa)         
      });
    });
    //bottom sheet 
    this.subBottomSide = this.btsServ.sideChange.subscribe(() => {
      this.bottomSideAperto = this.btsServ.bottomSideAperto
      this.hiddenCenter = this.btsServ.hiddenCenter
      this.vadoAlBill = this.btsServ.vaiAlBill
      this.hidden = this.btsServ.hidden
      
    setTimeout(() => {
      if(this.bottomSideAperto == true){
        this.suportList = this.lingSer.getProduct()
        this.suportList = this.suportList.filter((c) => c.category === this.lingSer.getCategory()[4].name)
        const index = this.suportList.findIndex(obj => obj.item === this.sideSelected().item);
        if (index <= 2) {  

          //cambia nelle lingue

          this.suportList.splice(3, 3);
          this.suportList[0].item = "Picole"
          this.suportList[1].item = "Medie"
          this.suportList[2].item = "Grandi"
        } 
        else{
          this.suportList.splice(0, 3);
          this.suportList[0].item = "Chedar"
          this.suportList[1].item = "Bacon"
          this.suportList[2].item = "Kebab"
        }
        this.sideList = this.suportList
      } 
    },0);
       
    });
  }

  // chiusura
  close(): void { 
    this.btsServ.bottomSideClosed()
    this.overlay.switch();
  }

  // animazioni
  hCT(){
    this.btsServ.hiddenCenterTrue()
  }
  hCF(){
    this.btsServ.hiddenCenterFalse()
  }
  hT(){
    this.btsServ.hiddenTrue()
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

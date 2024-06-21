import { Component} from '@angular/core';
import { CategoryComponent } from "../category/category.component";
import { ProdottiComponent } from "../prodotti/prodotti.component";
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';
import { LightDarkServiceService } from '../Service/light-dark-service.service';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
    selector: 'left-col',
    standalone: true,
    templateUrl: './left-col.component.html',
    styleUrl: './left-col.component.css',
    imports: [CategoryComponent, ProdottiComponent , CommonModule],
    animations: [
        trigger('animazioneLogo', [
          
          state('start', style({ transform: 'translatey(0%)'  })),
          
          state('end', style({ transform: 'translatey(-400%)' })),
          
          transition('start => end', [
            animate('500ms ease-out', style({ transform: 'translatey(-400%)' }))
          ]),
          transition('end => start', [
            animate('500ms ease-in', style({ transform: 'translatey(0%)' }))
          ]),
        ])
      ]
})
export class LeftColComponent{

    backVisible : boolean = false
    animazioneLogo : boolean = true
    nascondiTopCont() {
        this.backVisible = true
        this.animazioneLogo = false
    }
    back(){
        this.backVisible = false
        this.animazioneLogo = true    
    }
    
    Ehi : String =  this.lingSer.getTesto().Ehi
    WU : String = this.lingSer.getTesto().WU
    nome: string = this.lingSer.getTesto().Pop; 
    subscription !: Subscription;

    constructor(private lingSer : ChangeLanguagesService, private lDServ: LightDarkServiceService){}

    riceviNome(n: string) {
        this.nome = n;
    }

    ngOnInit(): void {  
        this.subscription = this.lingSer.cambioLingua.subscribe(() => {
            
            this.Ehi =  this.lingSer.getTesto().Ehi
            this.WU = this.lingSer.getTesto().WU
            this.nome = this.lingSer.getTesto().Pop
        
        });
    }
    getBackgroundColor(){
        return this.lDServ.backgroundBlack()
    }
    getTestiColor(){
        return this.lDServ.testi()
    }
}

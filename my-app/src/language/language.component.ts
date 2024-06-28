import { Component } from '@angular/core';
import { Lingua } from './lingua';
import { CommonModule } from '@angular/common';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';
import { LightDarkServiceService } from '../Service/light-dark-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css',
  animations: [
    trigger('showLanguage', [
      state('start', style({ transform: 'translateY(-100%)'  })),
      state('end', style({ transform: 'translateY(0%)' })),
      transition('start <=> end', [
        animate('400ms ease-out',)
      ])
    ])
  ]
})


export class LanguageComponent {
  

  constructor(
    private lingSer : ChangeLanguagesService, 
    private lDServ: LightDarkServiceService
  ){}

  contMenuLingue:boolean = false;
  
  selecLingua : Lingua = this.lingSer.getLinguaSel();
  LingueList : Lingua[] = this.lingSer.getLingue();
  
  subscription !: Subscription;
  
  ngOnInit(): void {  
    this.subscription = this.lingSer.cambioLingua.subscribe(() => {
      this.selecLingua = this.lingSer.getLinguaSel();
    });
  }

  cambiaStato(){
    this.contMenuLingue = !this.contMenuLingue
  }

  selezionaLingua(l : Lingua){
    if(l != this.selecLingua){
      this.selecLingua = l;
      this.lingSer.setLingua(l);
    }
  }

  getBackgroundColor(){
    return this.lDServ.background2()
  }
}

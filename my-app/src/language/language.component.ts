import { Component } from '@angular/core';
import { Lingua } from './lingua';
import { CommonModule } from '@angular/common';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css'
})


export class LanguageComponent {
  

  constructor(private lingSer : ChangeLanguagesService ){}

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
}

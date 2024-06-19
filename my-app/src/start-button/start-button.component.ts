import { Component} from '@angular/core';
import { StartButton } from './start-button';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RightColComponent } from '../right-col/right-col.component';
import { Subscription } from 'rxjs';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Testi } from '../app/testi';
import { LightDarkServiceService } from '../Service/light-dark-service.service';


@Component({
  selector: 'start-button',
  standalone: true,
  imports: [RouterOutlet , RouterLink, RightColComponent],
  templateUrl: './start-button.component.html',
  styleUrl: './start-button.component.css'
})



export class StartButtonComponent {
  

  constructor(private lingSer : ChangeLanguagesService, private lDServ: LightDarkServiceService){}
  subscription !: Subscription;

  Testo : Testi = this.lingSer.getTesto()
  pulsantiArray: StartButton[] = [
    {
      testo: this.Testo.EatIn ,
      immagine: '/assets/Eat-In.png'
    },
    {
      testo: this.Testo.TakeOut,
      immagine: '/assets/Take-Out.png'
    }
  ];

  ngOnInit(): void {  
    this.subscription = this.lingSer.cambioLingua.subscribe(() => {
      this.Testo = this.lingSer.getTesto()
      this.pulsantiArray[0].testo = this.Testo.EatIn
      this.pulsantiArray[1].testo = this.Testo.TakeOut  
    });}

  indice!: number;

  getPulsante(){
    return this.pulsantiArray;
  }

  setIndice(i: number){
    this.indice = i;
  }

  getIndice(){
    return this.indice;
  }
  getPulsBackgroundColor(){
    return this.lDServ.pulsBackground()
  }
  getTestiColor(){
    return this.lDServ.testi()
  }
}

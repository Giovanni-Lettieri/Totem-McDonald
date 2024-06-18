import { Component, input } from '@angular/core';
import { BillProd } from '../Bill/bill-prod';
import { CurrencyPipe } from '@angular/common';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'prod-check-out',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './prod-check-out.component.html',
  styleUrl: './prod-check-out.component.css'
})
export class ProdCheckOutComponent {
  rimozione : boolean = false;
  Cur : string = this.lingSer.getTesto().Curency
  prodotto = input.required<BillProd>()
  remove : string = "remove"; //assegna cambio lingua 
  constructor(
    private lingSer : ChangeLanguagesService,
  ){}

  subscription !: Subscription;

  ngOnInit(): void {  
    this.subscription = this.lingSer.cambioLingua.subscribe(() => {
      this.Cur = this.lingSer.getTesto().Curency
    });  
  }
}

import { Component, input } from '@angular/core';
import { BillProd } from '../Bill/bill-prod';

@Component({
  selector: 'prod-check-out',
  standalone: true,
  imports: [],
  templateUrl: './prod-check-out.component.html',
  styleUrl: './prod-check-out.component.css'
})
export class ProdCheckOutComponent {
  rimozione : boolean = false;
  prodotto = input.required<BillProd>()
  remove : string = "remove"; //assegna cambio lingua 
}

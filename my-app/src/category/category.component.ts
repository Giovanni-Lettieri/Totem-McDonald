import { Component, EventEmitter, Output, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from './category';
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';
import { LightDarkServiceService } from '../Service/light-dark-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [
    
  ]
})
export class CategoryComponent {
  
  constructor(
    private lingSer : ChangeLanguagesService, 
    private lDServ: LightDarkServiceService
  ){}
  
  pulsanteCliccato: number= -1;

  @Output() mandaNomeCat = new EventEmitter<string>();
  @Output() catSelezionata = new EventEmitter<void>()

  categoryList: Category[] = this.lingSer.getCategory();
  subscription !: Subscription;
  
  ngOnInit(): void {  
    this.subscription = this.lingSer.cambioLingua.subscribe(() => {
      this.categoryList = this.lingSer.getCategory();
      if(this.pulsanteCliccato != -1){
        this.mandaNomeCat.emit(this.categoryList[this.pulsanteCliccato].name);
      }else{
        this.PulsanteOff()
      }
    });
}

  @HostListener('document:click', ['$event'])
  ClickFuori(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('button')) {
      this.PulsanteOff();
    }

  }

  coloreSfondo(sconto: number, i: number) {
    return this.pulsanteCliccato == i ? '#FFCA40' : (sconto != 0 ? '#C8161D' : (this.lDServ.darkMode)?'#101010':'#EFECE5');
  }

  coloreTesto(sconto: number, i: number) {
    return this.pulsanteCliccato == i ? '#FFFFFF' : (sconto <= 0 ? ((this.lDServ.darkMode)?'white':'black') : '#FFFFFF');
  }

  mandaDato(n: string, i: number) {
    this.pulsanteCliccato = i;
    this.mandaNomeCat.emit(n);
  }

 

  @Input() changeCategory : boolean = true;

  animazioneLeftCol(){
    this.catSelezionata.emit()
    // this.changeCategory = false
  }

  PulsanteOff() {
    this.pulsanteCliccato = -1;
    this.mandaNomeCat.emit(this.lingSer.getTesto().Pop);
  }

  getBackgroundColor(){
    return this.lDServ.backgroundBlack()
  }
}
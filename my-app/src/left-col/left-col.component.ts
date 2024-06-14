import { Component} from '@angular/core';
import { CategoryComponent } from "../category/category.component";
import { ProdottiComponent } from "../prodotti/prodotti.component";
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'left-col',
    standalone: true,
    templateUrl: './left-col.component.html',
    styleUrl: './left-col.component.css',
    imports: [CategoryComponent, ProdottiComponent]
})
export class LeftColComponent{
    
    Ehi : String =  this.lingSer.getTesto().Ehi
    WU : String = this.lingSer.getTesto().WU
    nome: string = this.lingSer.getTesto().Pop; 
    subscription !: Subscription;

    constructor(private lingSer : ChangeLanguagesService ){}

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
}

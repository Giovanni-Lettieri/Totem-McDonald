import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartButtonComponent } from '../start-button/start-button.component';
import { LanguageComponent } from "../language/language.component";
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';
import { Testi } from './testi';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, StartButtonComponent, LanguageComponent]
})
export class AppComponent {
    title = "mc"

    constructor(private lingSer : ChangeLanguagesService ){}
    
    
    Titolo : String =  this.lingSer.getTesto().Titolo
    Titolo2 : String = this.lingSer.getTesto().Titolo2
     

    subscription !: Subscription;

    ngOnInit(): void {  
        this.subscription = this.lingSer.cambioLingua.subscribe(() => {
            this.Titolo =  this.lingSer.getTesto().Titolo
            this.Titolo2 = this.lingSer.getTesto().Titolo2
        });
    }
}

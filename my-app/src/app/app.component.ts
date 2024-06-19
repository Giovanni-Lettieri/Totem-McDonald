import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartButtonComponent } from '../start-button/start-button.component';
import { LanguageComponent } from "../language/language.component";
import { ChangeLanguagesService } from '../Service/change-languages.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LightDarkServiceService } from '../Service/light-dark-service.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, StartButtonComponent, LanguageComponent,CommonModule]
})
export class AppComponent {
    title = "mc"

    constructor(private lingSer : ChangeLanguagesService, private lDServ: LightDarkServiceService){}
    
    
    Titolo : String =  this.lingSer.getTesto().Titolo
    Titolo2 : String = this.lingSer.getTesto().Titolo2
    
     

    subscription !: Subscription;
    subscriptionDL !: Subscription;

    ngOnInit(): void {  
        this.subscription = this.lingSer.cambioLingua.subscribe(() => {
            this.Titolo =  this.lingSer.getTesto().Titolo
            this.Titolo2 = this.lingSer.getTesto().Titolo2
        });
    }   

    darkModeApp(){
        this.lDServ.switchMode()
    }
    getBackgroundColor(){
        return this.lDServ.background2()
    }
    getTestiColor(){
        return this.lDServ.testi()
    }

}

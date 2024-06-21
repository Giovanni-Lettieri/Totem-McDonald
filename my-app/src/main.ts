import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { Component } from '@angular/core';
import { LightDarkServiceService } from './Service/light-dark-service.service';
import { CommonModule } from '@angular/common';
import { BottomSheetOpenCloseService } from './Service/bottom-sheet-open-close.service';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err),);

  @Component({
    selector: 'app-bottom-sheet-content',
    standalone: true,
    templateUrl: '../src/index.html',
    styleUrls: ['../src/styles.css'],
    imports: [AppComponent, CommonModule, BrowserAnimationsModule ]
})
  export class Main{
    constructor(private lDServ: LightDarkServiceService){
    }
    

    getBackGroundColor() {
      return this.lDServ.backgroundBlack()
    }
  }
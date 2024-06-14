import { Routes } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { StartButtonComponent } from '../start-button/start-button.component';

export const routes: Routes = [
    {
        path:'MainScreen',
        component:  MainPageComponent ,
    },
    {
        path:'StartScreen',
        component: StartButtonComponent ,
    },
];

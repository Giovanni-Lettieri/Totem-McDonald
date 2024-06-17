import { Routes } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { StartButtonComponent } from '../start-button/start-button.component';
import { CheckOutComponent } from '../check-out/check-out.component';
import { RightColComponent } from '../right-col/right-col.component';

export const routes: Routes = [
    { path: 'MainScreen', component: MainPageComponent },
    { path: 'StartScreen', component: StartButtonComponent },
    { path: 'CheckOut', component: CheckOutComponent },
    { path: 'RightCol', component: RightColComponent }
]
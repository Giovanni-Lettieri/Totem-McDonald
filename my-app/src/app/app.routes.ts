import { Routes } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { StartButtonComponent } from '../start-button/start-button.component';
import { CheckOutComponent } from '../check-out/check-out.component';
import { RightColComponent } from '../right-col/right-col.component';

export const routes: Routes = [
    {path: 'MainScreen', component: MainPageComponent,
        children:[
            {path: 'CheckOut', component: CheckOutComponent },
        ]
    },
    {path: 'StartScreen', component: StartButtonComponent},
    {path: 'RightCol', component: RightColComponent },
]
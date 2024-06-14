import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightColComponent } from '../right-col/right-col.component';
import { LeftColComponent } from '../left-col/left-col.component';
import { CategoryComponent } from "../category/category.component";
import { Subscription } from 'rxjs';
import { OverlayService } from '../Service/overlay.service';

@Component({
    selector: 'main-page',
    standalone: true,
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css',
    imports: [RightColComponent, LeftColComponent, CategoryComponent,CommonModule]
})
export class MainPageComponent{
    isDivVisible : Boolean = false;
    
    subscription !: Subscription;

    constructor(private service: OverlayService){}

    ngOnInit(): void {  
    
        this.subscription = this.service.overlayChange.subscribe(() => {
            this.isDivVisible = !this.isDivVisible
        });
    }    
}

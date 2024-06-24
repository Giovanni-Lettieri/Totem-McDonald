import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightColComponent } from '../right-col/right-col.component';
import { LeftColComponent } from '../left-col/left-col.component';
import { CategoryComponent } from "../category/category.component";
import { Subscription } from 'rxjs';
import { OverlayService } from '../Service/overlay.service';
import { BottomSheetComponent } from "../bottom-sheet/bottom-sheet.component";
import { BottomSheetOpenCloseService } from '../Service/bottom-sheet-open-close.service';

@Component({
    selector: 'main-page',
    standalone: true,
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css',
    imports: [RightColComponent, LeftColComponent, CategoryComponent, CommonModule, BottomSheetComponent]
})
export class MainPageComponent{
    isDivVisible : Boolean = false;
    bottomSheetAperto: boolean = false
    
    subscription !: Subscription;
    subscriptionBottomSheet !: Subscription;

    constructor(private service: OverlayService, private btsServ: BottomSheetOpenCloseService){}

    ngOnInit(): void {  
        this.subscription = this.service.overlayChange.subscribe(() => {
            this.isDivVisible = !this.isDivVisible
        });
        this.subscriptionBottomSheet = this.btsServ.bTAChange.subscribe(() => {
            if(this.btsServ.bottomSheetAperto == false){
                setTimeout(() => {
                    this.bottomSheetAperto = this.btsServ.bottomSheetAperto
                }, 230);
            }else{
                this.bottomSheetAperto = this.btsServ.bottomSheetAperto
            }
        });
    }    
    getC(){
        return this.btsServ.getC()
    }
}

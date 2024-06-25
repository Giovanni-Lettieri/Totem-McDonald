import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightColComponent } from '../right-col/right-col.component';
import { LeftColComponent } from '../left-col/left-col.component';
import { CategoryComponent } from "../category/category.component";
import { Subscription } from 'rxjs';
import { OverlayService } from '../Service/overlay.service';
import { BottomSheetComponent } from "../bottom-sheet/bottom-sheet.component";
import { BottomSheetOpenCloseService } from '../Service/bottom-sheet-open-close.service';
import { BottomSheetSideComponent } from "../bottom-sheet-side/bottom-sheet-side.component";


@Component({
    selector: 'main-page',
    standalone: true,
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css',
    imports: [
        RightColComponent,
        LeftColComponent,
        CategoryComponent,
        CommonModule,
        BottomSheetComponent,
        BottomSheetSideComponent
    ]
})
export class MainPageComponent{
    isDivVisible : Boolean = false;
    bottomSheetAperto: boolean = false
    bottomSideAperto : boolean = false

    subscription !: Subscription;
    subscriptionBottomSheet !: Subscription;
    subBottomSide !: Subscription

    constructor(private service: OverlayService, private btsServ: BottomSheetOpenCloseService){}

    ngOnInit(): void {  
        
        //overlay
        this.subscription = this.service.overlayChange.subscribe(() => {
            this.isDivVisible = !this.isDivVisible
        });

        //botom sheet
        this.subscriptionBottomSheet = this.btsServ.bTAChange.subscribe(() => {
            if(this.btsServ.bottomSheetAperto == false){
                setTimeout(() => {
                    this.bottomSheetAperto = this.btsServ.bottomSheetAperto
                }, 230);
            }else{
                this.bottomSheetAperto = this.btsServ.bottomSheetAperto
            }
        });

        //bottom sheet side
        this.subBottomSide = this.btsServ.sideChange.subscribe(() => {
            if(this.btsServ.bottomSideAperto == false){
                setTimeout(() => {
                    this.bottomSideAperto = this.btsServ.bottomSideAperto
                }, 230);
            }else{
                this.bottomSideAperto = this.btsServ.bottomSideAperto
            }
        });
    }    
    getP(){
        return this.btsServ.getC()
    }

}

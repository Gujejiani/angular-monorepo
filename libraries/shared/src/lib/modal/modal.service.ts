import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { Injectable } from "@angular/core";
import { IModalConfig } from "./modal.config";
import { ComponentPortal } from "@angular/cdk/portal";
import { Observable, Subscription } from "rxjs";


@Injectable({providedIn: 'root'})


export class ModalService  {
  private overlayRef: OverlayRef | null = null;
  
  private subscriptions: Subscription = new Subscription();

  constructor(private overlay: Overlay){

  }


  openPortal(config: IModalConfig){
       
    this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',

        // positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    })

      

    const portal = new ComponentPortal(config.component);

    const componentRef= this.overlayRef.attach(portal);


    if(config.inputs){
        Object.keys(config.inputs).forEach(key=>{
            componentRef.instance[key] = config.inputs[key];
        })
    }

    if(config.outputs){
        Object.keys(config.outputs).forEach((key: string)=>{
           if(key in componentRef.instance){
            const output =     componentRef.instance[key] as Observable<any>;

            const subscription =   output.subscribe((res)=>{
                 console.log('listening from modal service')
                config.outputs[key]();
            })

            this.subscriptions.add(subscription);

           }
        })
     }


     const backDropSubscription =  this.overlayRef.backdropClick().subscribe(res=>{
        this.closePortal();
      })
       this.subscriptions.add(backDropSubscription);

  }

    closePortal(){
       if(this.overlayRef){
           this.overlayRef.dispose();
       }
       this.subscriptions.unsubscribe();
       this.subscriptions = new Subscription();
     
    }

}

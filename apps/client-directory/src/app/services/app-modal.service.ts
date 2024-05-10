import { Store } from '@ngrx/store';
import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef, ComponentRef } from "@angular/core";
import { ModalComponent } from "@angular-monorepo/shared-ui";
import { Subject, take } from 'rxjs';
import { selectModalInfo } from '../store/users/users.selectors';
import { RESET_MODAL } from '../store/users/users.actions';

@Injectable({ providedIn: 'root' })
export class AppModalService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private store: Store
  ) {}
  componentRef: ComponentRef<ModalComponent> | null = null;
  
  private modalOutputSubject = new Subject<any>();
  // todo remove if won't be  needed
  modalOutput$ = this.modalOutputSubject.asObservable();
  storeSubscription$ :any
  // Attaches modal component to the DOM body with input data
  showModal(data: {
    title: string,
    message: string,
    success: boolean
  
  }): void {
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
     this.componentRef = componentFactory.create(this.injector);

    // Pass input data to the component instance
    this.componentRef.instance.modalInfo = data;

    // Subscribes to the output event of the modal component
    this.componentRef.instance.closeModal.pipe(take(1)).subscribe(() => {
       this.closeModal()
    });

    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.componentRef.onDestroy(() => {
        if(this.componentRef){
            this.appRef.detachView(this.componentRef.hostView);
            this.modalOutputSubject.complete();
        }
   
    });
  }

/**
 * Listens to the store to show the modal
 */
  listenStoreToShowModal(){
   this.storeSubscription$ = this.store.select(selectModalInfo).subscribe((modalInfo) => {
    
      if(modalInfo.message){
        this.showModal(modalInfo)
      }
    })
  }
/**
 * Closes the modal
 */
  closeModal(){
    if(this.componentRef){
        this.componentRef?.destroy();
        this.store.dispatch(RESET_MODAL())
    }
  }

  /**
   * Destroys the subscription
   */
  destroySubscription(){
   
    if(this.storeSubscription$){
      this.storeSubscription$.unsubscribe();
    }
    this.closeModal()
  }
}

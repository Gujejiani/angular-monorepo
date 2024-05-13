import { Store } from '@ngrx/store';
import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef, ComponentRef } from "@angular/core";
import { ModalComponent, ModalData } from "@angular-monorepo/shared";
import { Observable, Subject, take } from 'rxjs';
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
  /**
   * 
   * @param data modal data 
   * @param returnOutput if true, the modal will return the output and the caller will have to subscribe and close modal afterwards
   * @returns 
   */
  showModal(data: ModalData): void | Observable<any>  {
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
     this.componentRef = componentFactory.create(this.injector);

    // Pass input data to the component instance
    this.componentRef.instance.modalInfo = data;

  
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

      // Subscribes to the output event of the modal component
      if(data.returnOutput){
        return  this.componentRef.instance.closeModal.pipe(take(1))
      }
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

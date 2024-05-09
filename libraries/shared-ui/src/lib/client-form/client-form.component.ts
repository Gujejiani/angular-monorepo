import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarComponent } from '../status-bar/status-bar.component';
import { ClientFormSectionNames, UserModel } from '../models';
import {  FormGroup, ReactiveFormsModule } from '@angular/forms';
import { slideFadeAnimation } from '../animation/animations';



@Component({
  selector: 'lib-client-form',
  standalone: true,
  imports: [CommonModule, StatusBarComponent, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slideFadeAnimation
  ]
})

export class UIClientFormContainerComponent {
  constructor( private cdr: ChangeDetectorRef) {}
  SECTIONS = ClientFormSectionNames
  @Input({
    required: true
  }) selectedSection = ClientFormSectionNames.PERSONAL
  @Input({
    required: true
  }) userForm: FormGroup = new FormGroup({})

  @Output() sectionChange = new EventEmitter<ClientFormSectionNames>()
  @Output() fromSubmitted = new EventEmitter<UserModel>()

  isRightButtonClick=true
  onNextClick($event: MouseEvent){
    
    $event.preventDefault()

    this.sectionChange.emit(this.selectedSection + 1)
    this.isRightButtonClick =true;
    this.cdr.markForCheck()
  }
  onPrevClick($event: MouseEvent){
    $event.preventDefault()
    this.sectionChange.emit(this.selectedSection - 1)
    this.isRightButtonClick =false
    this.cdr.markForCheck()
  }
  onSubmit() {
    // anyway second check
    if(this.userForm.valid){
      this.fromSubmitted.emit(this.userForm.value)
    }

  }

  getAnimationTrigger(): string {
    return this.isRightButtonClick ? 'slideFadeAnimation' : 'slideFadeAnimationLeft';
  }

  get nextIsDisabled(){
      switch(this.selectedSection){
        case ClientFormSectionNames.PERSONAL:
          return  this.userForm.get('firstName')?.invalid || this.userForm.get('lastName')?.invalid || this.userForm.get('personalId')?.invalid;
        case ClientFormSectionNames.LEGAL_ADDRESS:
          return this.userForm.get('legalAddress.country')?.invalid || this.userForm.get('legalAddress.city')?.invalid || this.userForm.get('legalAddress.address')?.invalid || this.userForm.get('phoneNumber')?.invalid 
      
        default: return true
      } 
       
  } 
}

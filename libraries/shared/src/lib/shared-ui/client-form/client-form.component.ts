import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientFormSectionNames } from '../../models';
import {  FormGroup, ReactiveFormsModule } from '@angular/forms';
import { slideFadeAnimation } from '../../animation/animations';
import { StatusBarComponent } from '../status-bar/status-bar.component';
import { UserModel } from '../../models/user-models';



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

export class UIClientFormContainerComponent implements OnInit {
  constructor( private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
      if(this.editUser){
        this.userForm.patchValue(this.editUser)
      }   
  }
  SECTIONS = ClientFormSectionNames
  @Input({
    required: true
  }) selectedSection = ClientFormSectionNames.PERSONAL
  @Input({
    required: true
  }) userForm: FormGroup = new FormGroup({})

  @Input() editUser: UserModel | null | undefined = null

  @Output() sectionChange = new EventEmitter<ClientFormSectionNames>()
  @Output() fromSubmitted = new EventEmitter<{user: UserModel, update?: boolean}>()
  @Output() deleteUser = new EventEmitter<string>();
  @Output() photoUploaded = new EventEmitter<File>();
  isRightButtonClick=true;


  onFileChange(event: any) {
    if(event.target?.files?.length > 0){
      this.photoUploaded.emit(event.target.files[0])
    }
     
  }

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
  getFormIsValid(){

    return this.userForm.status ==='VALID' 
  }
  onDeleteUser(){
    if(this.editUser?.id){
      
      this.deleteUser.emit(this.editUser.id)
    }
   
  
  }
  onSubmit() {
    // anyway second check
    if(this.userForm.valid){
      this.fromSubmitted.emit({user: this.userForm.value, update: this.editUser !== null})
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

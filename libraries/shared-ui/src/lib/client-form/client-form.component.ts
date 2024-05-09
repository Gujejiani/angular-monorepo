import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarComponent } from '../status-bar/status-bar.component';
import { ClientFormSectionNames } from '../models';
import {  FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'lib-client-form',
  standalone: true,
  imports: [CommonModule, StatusBarComponent, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UIClientFormComponent {
  SECTIONS = ClientFormSectionNames
  @Input() selectedSection = ClientFormSectionNames.PERSONAL
  @Output() sectionChange = new EventEmitter<ClientFormSectionNames>()
  constructor(private formBuilder: FormBuilder) {}
 @Input() userForm: FormGroup = new FormGroup({})

  onNextClick($event: MouseEvent){
    console.log(this.userForm.controls)
    $event.preventDefault()
    console.log(this.SECTIONS[this.selectedSection + 1])
    this.sectionChange.emit(this.selectedSection + 1)
  }
  onPrevClick($event: MouseEvent){
    $event.preventDefault()
    this.sectionChange.emit(this.selectedSection - 1)
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.userForm)
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

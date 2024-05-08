import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarComponent } from '../status-bar/status-bar.component';
import { ClientFormSections, UserModel } from '../models';
import {  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { patternValidator, genderValidator, startsWithValidator} from '../utils/utils';

const georgianPattern = /^[\u10A0-\u10FF\s\d]*$/; // Georgian letters and numbers pattern
const englishPattern = /^[a-zA-Z\s\d]*$/; 
@Component({
  selector: 'lib-client-form',
  standalone: true,
  imports: [CommonModule, StatusBarComponent, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UIClientFormComponent {
  SECTIONS = ClientFormSections
  @Input() selectedSection = ClientFormSections.PERSONAL
  @Output() sectionChange = new EventEmitter<ClientFormSections>()
  constructor(private formBuilder: FormBuilder) {}
  userForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50, ), patternValidator(georgianPattern, englishPattern)] ],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), patternValidator(georgianPattern, englishPattern)]],

    
    legalAddress: this.formBuilder.group({
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    }),
    factualAddress: this.formBuilder.group({
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    }),
    photo: [''],
    gender: ['male', [Validators.required, genderValidator()]],
    personalId: ['',[Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
    phoneNumber: ['',[Validators.required,  Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$'), startsWithValidator('5')]],
    
  });

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
    console.log(this.userForm.value)
  }
}

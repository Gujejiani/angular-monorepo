import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarComponent } from '../status-bar/status-bar.component';
import { ClientFormSections, UserModel } from '../models';
import {  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  SECTIONS = ClientFormSections
  @Input() selectedSection = ClientFormSections.PERSONAL
  @Output() sectionChange = new EventEmitter<ClientFormSections>()
  constructor(private formBuilder: FormBuilder) {}
  userForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required, ],
    lastName: [''],

    
    legalAddress: this.formBuilder.group({
      country: [''],
      city: [''],
      address: [''],
    }),
    factualAddress: this.formBuilder.group({
      country: [''],
      city: [''],
      address: [''],
    }),
    photo: [''],
    gender: [''],
    personalId: [''],
    phoneNumber: [''],
    
  });

  onNextClick($event: MouseEvent){
    console.log(this.userForm.value)
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

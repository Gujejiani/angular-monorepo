import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarComponent } from '../status-bar/status-bar.component';
import { ClientFormSections, UserModel } from '../models';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    legalAddress: new FormControl(''),
    legalCountry: new FormControl(''),
    legalCity: new FormControl(''),
    factualCity: new FormControl(''),
    factualCountry: new FormControl(''),
    factualAddress:  new FormControl(''),
    photo: new FormControl(''),
    gender: new FormControl('female'),
    personalId: new FormControl(null),
    phoneNumber: new FormControl(null),
    
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
}

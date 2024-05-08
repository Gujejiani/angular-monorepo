import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIClientFormComponent } from './client-form.component';

describe('UIClientFormComponent', () => {
  let component: UIClientFormComponent;
  let fixture: ComponentFixture<UIClientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UIClientFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UIClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

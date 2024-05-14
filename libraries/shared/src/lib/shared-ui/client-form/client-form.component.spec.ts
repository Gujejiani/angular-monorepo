import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UIClientFormContainerComponent } from "./client-form.component";

describe("UIClientFormContainerComponent", () => {
  let component: UIClientFormContainerComponent;
  let fixture: ComponentFixture<UIClientFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UIClientFormContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UIClientFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

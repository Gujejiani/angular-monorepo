import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ClientFormContainerComponent } from "./client-form-container.component";

describe("ClientFormContainerComponent", () => {
  let component: ClientFormContainerComponent;
  let fixture: ComponentFixture<ClientFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFormContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

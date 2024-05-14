import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { ModalData } from "../../models";
import { Router } from "@angular/router";

@Component({
  selector: "lib-modal",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  constructor(private router: Router) {}
  @Input() modalInfo: ModalData = {
    title: "Title",
    message: "Message",
    success: false,
    navigationText: "#323i23424224",
    navigationUrl: "",
  };
  @Output() closeModal = new EventEmitter<boolean>();

  close(close: boolean) {
    this.closeModal.emit(close);
  }

  /**
   * @USAGE - make sure modal is closed from on Destroy, from container which triggers open modal
   */
  navigate() {
    this.router.navigate([this.modalInfo.navigationUrl]);
  }
}

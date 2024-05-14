import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
  selector: "lib-pagination",
  standalone: true,
  imports: [CommonModule, MatPaginator],
  templateUrl: "./pagination.component.html",
  styleUrl: "./pagination.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Output() paginationChanged = new EventEmitter();
  @Input() pageSize = 8;
  @Input() length = 100;
  @Input() pageIndex = 0;
  onPageChange(data: PageEvent) {
    this.paginationChanged.emit(data);
  }
}

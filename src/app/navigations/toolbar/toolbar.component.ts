import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output('toggleSideNav') toggleSidenav: EventEmitter<void> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
}

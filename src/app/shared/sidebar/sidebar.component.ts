import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/configuracion/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public menu: any;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.menu = this.sidebarService.getMenu;
  }
}

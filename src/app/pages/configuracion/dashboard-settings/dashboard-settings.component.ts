import { Component, OnInit } from '@angular/core';
import { DashconfigService } from '../../../services/configuracion/dashconfig.service';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.css'],
})
export class DashboardSettingsComponent implements OnInit {
  public manualRegister!: boolean;

  constructor(public dashConfigService: DashconfigService) {}

  ngOnInit(): void {
    this.manualRegister = this.dashConfigService.getOptions.manualLoginReg;
  }

  activarManualRegister(evento: any) {
    this.dashConfigService.setManualLoginReg = evento.target.checked;
  }
}

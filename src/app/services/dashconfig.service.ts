import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashconfigService {
  private options = {
    manualLoginReg: false,
  };

  get getOptions() {
    return { ...this.options };
  }

  set setManualLoginReg(checked: boolean) {
    this.options.manualLoginReg = checked;
  }

  constructor() {}
}

import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo!: string;
  public data$!: Subscription;

  constructor(private router: Router) {
    this.data$ = this.extraerDataRuta().subscribe(
      ({ titulo }) => (this.titulo = titulo)
    );
  }
  ngOnDestroy(): void {
    this.data$.unsubscribe();
  }

  extraerDataRuta() {
    return this.router.events.pipe(
      filter((element: any) => element instanceof ActivationEnd),
      filter((element: ActivationEnd) => element.snapshot.firstChild === null),
      map((element) => element.snapshot.data)
    );
  }
}

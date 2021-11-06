import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Data, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo: string;
  public path: string;
  // Obervable de tipo Susbcribe
  public tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentsRuta()
                        .subscribe( ({ path, titulo }) => {
                            this.titulo = titulo;
                            this.path = path;
                            document.title = `MonsterAdmin - ${ titulo }`;
                        });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentsRuta(): Observable<Data>{
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null  ),
        map( (event: ActivationEnd) => event.snapshot.data ),
      );
  }


}

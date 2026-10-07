import { Component } from '@angular/core';
import {HeaderService } from '../services/header-service/header';
import { HeaderModel } from '../models/header/header.model';
import { map } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  header: HeaderModel | null = null;

  constructor(public headerService: HeaderService,
  private cd: ChangeDetectorRef
  )
  {
    console.log(this.headerService);
    this.headerService.getHeader().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.header = data.length ? data[0] : null;
      this.cd.detectChanges();
      console.log(data);
    });
  }
}

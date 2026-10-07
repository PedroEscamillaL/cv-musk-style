import { Component, ChangeDetectorRef } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-languages',
  standalone: false,
  templateUrl: './languages.html',
  styleUrl: './languages.scss',
})
export class LanguagesComponent {

   languages: Languages[] | null = null;

  constructor(
    public languagesService: LanguagesService,
    private cd: ChangeDetectorRef
  ) {

    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe(data => {
      this.languages = data.length ? data : null;
      console.log(this.languages);

      this.cd.detectChanges();
    });
  }

}

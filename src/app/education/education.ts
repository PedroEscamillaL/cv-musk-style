import { Component, ChangeDetectorRef } from '@angular/core';
import { EducationService } from '../services/education-service/education';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class EducationComponent {

 education: Education[] | null = null;

  constructor(
    public educationService: EducationService,
    private cd: ChangeDetectorRef
  ) {

    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe(data => {
      this.education = data.length ? data : null;
      console.log(this.education);

      this.cd.detectChanges();
    });
  }
}

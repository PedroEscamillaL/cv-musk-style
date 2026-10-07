import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-work-experience',
  standalone: false,
  templateUrl: './work-experience.html',
  styleUrl: './work-experience.scss',
})
export class WorkExperienceComponent {
  workExperience: WorkExperience[] | null = null;
  constructor(
public workExperienceService: WorkExperienceService,
private cd: ChangeDetectorRef
) {
    console.log(this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.workExperience = data.length ? data : null;
      console.log(this.workExperience);
      this.cd.detectChanges();   
 });
  }
  
}

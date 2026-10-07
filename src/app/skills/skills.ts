
import { SkillsService } from '../services/skills-service/skills';
import { Skills } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';
import { Component, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent {
  
 skills: Skills[] | null = null;

  constructor(
    public skillsService: SkillsService,
    private cd: ChangeDetectorRef
  ) {
    this.skillsService.getSkills().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe(data => {
      this.skills = data.length ? data : null;
      console.log(this.skills);

      this.cd.detectChanges(); 
    });
  }

}

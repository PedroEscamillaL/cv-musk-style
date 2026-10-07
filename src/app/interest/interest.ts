import { Component, ChangeDetectorRef } from '@angular/core';
import { InterestService } from '../services/interest-service/interest';
import { Interest } from '../models/interest/interest.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-interest',
  standalone: false,
  templateUrl: './interest.html',
  styleUrl: './interest.scss',
})
export class InterestComponent {

interest: Interest[] | null = null;

  constructor(
    public interestService: InterestService,
    private cd: ChangeDetectorRef
  ) {

    this.interestService.getInterest().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe(data => {
      this.interest = data.length ? data : null;
      console.log(this.interest);

      this.cd.detectChanges();
    });
  }


}

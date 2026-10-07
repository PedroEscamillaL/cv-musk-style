import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { WorkExperienceComponent } from './work-experience';
import { WorkExperienceService } from '../services/work-experience-service/work-experience';

describe('WorkExperience', () => {
  let component: WorkExperienceComponent;
  let fixture: ComponentFixture<WorkExperienceComponent>;
  let snapshots: Subject<any[]>;
  const service = { getWorkExperience: vi.fn(() => ({ snapshotChanges: () => snapshots.asObservable() })) };

  beforeEach(async () => {
    snapshots = new Subject<any[]>();
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [WorkExperienceComponent],
      providers: [{ provide: WorkExperienceService, useValue: service }]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render no records when the collection is empty', () => {
    snapshots.next([]);
    fixture.detectChanges();

    expect(component.workExperience).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('ul.experience-list > li').length).toBe(0);
  });

  it('should map collection records and render their data', () => {
    snapshots.next([{ payload: { doc: { id: 'record-1', data: () => ({ startDate: 'Jan 2022', endDate: 'Mar 2025', location: 'Orbital City', position: 'Frontend Engineer', company: 'Orbital City Labs', accomplishments: ['Built accessible interfaces'] }) } } }]);
    fixture.detectChanges();

    expect(component.workExperience).toEqual([{ id: 'record-1', startDate: 'Jan 2022', endDate: 'Mar 2025', location: 'Orbital City', position: 'Frontend Engineer', company: 'Orbital City Labs', accomplishments: ['Built accessible interfaces'] }]);
    const rendered = fixture.nativeElement as HTMLElement;
    expect(rendered.textContent).toContain('Jan 2022 - Mar 2025');
    expect(rendered.textContent).toContain('Orbital City');
    expect(rendered.textContent).toContain('Frontend Engineer');
    expect(rendered.textContent).toContain('Orbital City Labs');
    expect(rendered.textContent).toContain('Built accessible interfaces');
    expect(rendered.querySelectorAll('ul.experience-list > li').length).toBe(1);
  });



  it('should render an experience without optional accomplishments', () => {
    snapshots.next([{
      payload: {
        doc: {
          id: 'record-without-accomplishments',
          data: () => ({ position: 'Consultant', company: 'Independent' })
        }
      }
    }]);
    fixture.detectChanges();

    const rendered = fixture.nativeElement as HTMLElement;
    expect(rendered.textContent).toContain('Consultant');
    expect(rendered.textContent).toContain('Independent');
    expect(rendered.querySelectorAll('.experience-item ul li').length).toBe(0);
  });

  it('should safely render a null item in the template', () => {
    fixture.destroy();
    fixture = TestBed.createComponent(WorkExperienceComponent);
    component = fixture.componentInstance;
    component.workExperience = [null as any];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('ul.experience-list > li').length).toBe(1);
  });

});

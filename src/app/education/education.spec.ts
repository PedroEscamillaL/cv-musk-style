import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { EducationComponent } from './education';
import { EducationService } from '../services/education-service/education';

describe('Education', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let snapshots: Subject<any[]>;
  const service = { getEducation: vi.fn(() => ({ snapshotChanges: () => snapshots.asObservable() })) };

  beforeEach(async () => {
    snapshots = new Subject<any[]>();
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [EducationComponent],
      providers: [{ provide: EducationService, useValue: service }]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render no records when the collection is empty', () => {
    snapshots.next([]);
    fixture.detectChanges();

    expect(component.education).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('ul li').length).toBe(0);
  });

  it('should map collection records and render their data', () => {
    snapshots.next([{ payload: { doc: { id: 'record-1', data: () => ({ startDate: '2020', endDate: '2024', location: 'Veracruz', degree: 'Software Engineering', institution: 'University of Veracruz' }) } } }]);
    fixture.detectChanges();

    expect(component.education).toEqual([{ id: 'record-1', startDate: '2020', endDate: '2024', location: 'Veracruz', degree: 'Software Engineering', institution: 'University of Veracruz' }]);
    const rendered = fixture.nativeElement as HTMLElement;
    expect(rendered.textContent).toContain('2020 - 2024');
    expect(rendered.textContent).toContain('Veracruz');
    expect(rendered.textContent).toContain('Software Engineering');
    expect(rendered.textContent).toContain('University of Veracruz');
    expect(rendered.querySelectorAll('ul li').length).toBe(1);
  });



  it('should safely render a null item in the template', () => {
    fixture.destroy();
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    component.education = [null as any];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('ul li').length).toBe(1);
  });

});

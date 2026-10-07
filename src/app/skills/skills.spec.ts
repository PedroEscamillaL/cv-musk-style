import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { SkillsComponent } from './skills';
import { SkillsService } from '../services/skills-service/skills';

describe('Skills', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let snapshots: Subject<any[]>;
  const service = { getSkills: vi.fn(() => ({ snapshotChanges: () => snapshots.asObservable() })) };

  beforeEach(async () => {
    snapshots = new Subject<any[]>();
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [SkillsComponent],
      providers: [{ provide: SkillsService, useValue: service }]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render no records when the collection is empty', () => {
    snapshots.next([]);
    fixture.detectChanges();

    expect(component.skills).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('ul li').length).toBe(0);
  });

  it('should map collection records and render their data', () => {
    snapshots.next([{ payload: { doc: { id: 'record-1', data: () => ({ name: 'TypeScript', level: 90 }) } } }]);
    fixture.detectChanges();

    expect(component.skills).toEqual([{ id: 'record-1', name: 'TypeScript', level: 90 }]);
    const rendered = fixture.nativeElement as HTMLElement;
    expect(rendered.textContent).toContain('TypeScript');
    expect(rendered.textContent).toContain('90%');
    expect(rendered.querySelectorAll('ul li').length).toBe(1);
  });



  it('should safely render a null item in the template', () => {
    fixture.destroy();
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    component.skills = [null as any];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('ul li').length).toBe(1);
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { LanguagesComponent } from './languages';
import { LanguagesService } from '../services/languages-service/languages';

describe('Languages', () => {
  let component: LanguagesComponent;
  let fixture: ComponentFixture<LanguagesComponent>;
  let snapshots: Subject<any[]>;
  const service = { getLanguages: vi.fn(() => ({ snapshotChanges: () => snapshots.asObservable() })) };

  beforeEach(async () => {
    snapshots = new Subject<any[]>();
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [LanguagesComponent],
      providers: [{ provide: LanguagesService, useValue: service }]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render no records when the collection is empty', () => {
    snapshots.next([]);
    fixture.detectChanges();

    expect(component.languages).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('ul li').length).toBe(0);
  });

  it('should map collection records and render their data', () => {
    snapshots.next([{ payload: { doc: { id: 'record-1', data: () => ({ name: 'Spanish', level: 'Native' }) } } }]);
    fixture.detectChanges();

    expect(component.languages).toEqual([{ id: 'record-1', name: 'Spanish', level: 'Native' }]);
    const rendered = fixture.nativeElement as HTMLElement;
    expect(rendered.textContent).toContain('Spanish');
    expect(rendered.textContent).toContain('Native');
    expect(rendered.querySelectorAll('ul li').length).toBe(1);
  });



  it('should safely render a null item in the template', () => {
    fixture.destroy();
    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    component.languages = [null as any];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('ul li').length).toBe(1);
  });

});

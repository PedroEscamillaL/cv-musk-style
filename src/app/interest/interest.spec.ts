import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { InterestComponent } from './interest';
import { InterestService } from '../services/interest-service/interest';

describe('Interest', () => {
  let component: InterestComponent;
  let fixture: ComponentFixture<InterestComponent>;
  let snapshots: Subject<any[]>;
  const service = { getInterest: vi.fn(() => ({ snapshotChanges: () => snapshots.asObservable() })) };

  beforeEach(async () => {
    snapshots = new Subject<any[]>();
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [InterestComponent],
      providers: [{ provide: InterestService, useValue: service }]
    }).compileComponents();

    fixture = TestBed.createComponent(InterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render no records when the collection is empty', () => {
    snapshots.next([]);
    fixture.detectChanges();

    expect(component.interest).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('ul li').length).toBe(0);
  });

  it('should map collection records and render their data', () => {
    snapshots.next([{ payload: { doc: { id: 'record-1', data: () => ({ name: 'Machine learning' }) } } }]);
    fixture.detectChanges();

    expect(component.interest).toEqual([{ id: 'record-1', name: 'Machine learning' }]);
    const rendered = fixture.nativeElement as HTMLElement;
    expect(rendered.textContent).toContain('Machine learning');
    expect(rendered.querySelectorAll('ul li').length).toBe(1);
  });



  it('should safely render a null item in the template', () => {
    fixture.destroy();
    fixture = TestBed.createComponent(InterestComponent);
    component = fixture.componentInstance;
    component.interest = [null as any];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('ul li').length).toBe(1);
  });

});

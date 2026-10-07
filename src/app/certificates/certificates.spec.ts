import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { CertificatesComponent } from './certificates';
import { CertificatesService } from '../services/certificates-service/certificates';

describe('Certificates', () => {
  let component: CertificatesComponent;
  let fixture: ComponentFixture<CertificatesComponent>;
  let snapshots: Subject<any[]>;
  const service = { getCertificates: vi.fn(() => ({ snapshotChanges: () => snapshots.asObservable() })) };

  beforeEach(async () => {
    snapshots = new Subject<any[]>();
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [CertificatesComponent],
      providers: [{ provide: CertificatesService, useValue: service }]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render no records when the collection is empty', () => {
    snapshots.next([]);
    fixture.detectChanges();

    expect(component.certificates).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('ul li').length).toBe(0);
  });

  it('should map collection records and render their data', () => {
    snapshots.next([{ payload: { doc: { id: 'record-1', data: () => ({ title: 'Cloud Architecture', year: '2025', description: 'Professional certification' }) } } }]);
    fixture.detectChanges();

    expect(component.certificates).toEqual([{ id: 'record-1', title: 'Cloud Architecture', year: '2025', description: 'Professional certification' }]);
    const rendered = fixture.nativeElement as HTMLElement;
    expect(rendered.textContent).toContain('Cloud Architecture');
    expect(rendered.textContent).toContain('2025');
    expect(rendered.textContent).toContain('Professional certification');
    expect(rendered.querySelectorAll('ul li').length).toBe(1);
  });



  it('should safely render a null item in the template', () => {
    fixture.destroy();
    fixture = TestBed.createComponent(CertificatesComponent);
    component = fixture.componentInstance;
    component.certificates = [null as any];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('ul li').length).toBe(1);
  });

});

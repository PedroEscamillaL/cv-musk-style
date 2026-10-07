import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Header } from './header';
import { HeaderService } from '../services/header-service/header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let snapshots: Subject<any[]>;
  const service = { getHeader: vi.fn(() => ({ snapshotChanges: () => snapshots.asObservable() })) };

  beforeEach(async () => {
    snapshots = new Subject<any[]>();
    await TestBed.configureTestingModule({
      declarations: [Header],
      providers: [{ provide: HeaderService, useValue: service }]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an empty header when there are no records', () => {
    snapshots.next([]);
    fixture.detectChanges();

    expect(component.header).toBeNull();
    expect(fixture.nativeElement.querySelector('.header-container h1').textContent).toBe('');
  });

  it('should map and render the first header record', () => {
    snapshots.next([{
      payload: {
        doc: {
          id: 'header-1',
          data: () => ({
            name: 'Ada Lovelace',
            goalLife: 'Build useful systems',
            photoUrl: '/ada.png',
            email: 'ada@example.test',
            phoneNumber: '+52 555 0100',
            location: 'Veracruz, México',
            socialNetwork: '@ada'
          })
        }
      }
    }]);
    fixture.detectChanges();

    expect(component.header).toEqual({
      id: 'header-1',
      name: 'Ada Lovelace',
      goalLife: 'Build useful systems',
      photoUrl: '/ada.png',
      email: 'ada@example.test',
      phoneNumber: '+52 555 0100',
      location: 'Veracruz, México',
      socialNetwork: '@ada'
    });
    const rendered = fixture.nativeElement as HTMLElement;
    expect(rendered.textContent).toContain('Ada Lovelace');
    expect(rendered.textContent).toContain('Build useful systems');
    expect(rendered.textContent).toContain('ada@example.test');
    expect(rendered.querySelector('img')?.getAttribute('src')).toBe('/ada.png');
  });
});

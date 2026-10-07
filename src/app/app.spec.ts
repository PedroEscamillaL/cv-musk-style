import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { delay, of } from 'rxjs';
import { App } from './app';
import { Header } from './header/header';
import { WorkExperienceComponent } from './work-experience/work-experience';
import { EducationComponent } from './education/education';
import { SkillsComponent } from './skills/skills';
import { CertificatesComponent } from './certificates/certificates';
import { LanguagesComponent } from './languages/languages';
import { InterestComponent } from './interest/interest';
import { HeaderService } from './services/header-service/header';
import { WorkExperienceService } from './services/work-experience-service/work-experience';
import { EducationService } from './services/education-service/education';
import { SkillsService } from './services/skills-service/skills';
import { CertificatesService } from './services/certificates-service/certificates';
import { LanguagesService } from './services/languages-service/languages';
import { InterestService } from './services/interest-service/interest';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [
        App, Header, WorkExperienceComponent, EducationComponent,
        SkillsComponent, CertificatesComponent, LanguagesComponent, InterestComponent,
      ],
      providers: [
        { provide: HeaderService, useValue: { getHeader: () => ({ snapshotChanges: () => of([]).pipe(delay(0)) }) } },
        { provide: WorkExperienceService, useValue: { getWorkExperience: () => ({ snapshotChanges: () => of([]).pipe(delay(0)) }) } },
        { provide: EducationService, useValue: { getEducation: () => ({ snapshotChanges: () => of([]).pipe(delay(0)) }) } },
        { provide: SkillsService, useValue: { getSkills: () => ({ snapshotChanges: () => of([]).pipe(delay(0)) }) } },
        { provide: CertificatesService, useValue: { getCertificates: () => ({ snapshotChanges: () => of([]).pipe(delay(0)) }) } },
        { provide: LanguagesService, useValue: { getLanguages: () => ({ snapshotChanges: () => of([]).pipe(delay(0)) }) } },
        { provide: InterestService, useValue: { getInterest: () => ({ snapshotChanges: () => of([]).pipe(delay(0)) }) } },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
    expect((fixture.componentInstance as any).title()).toBe('cv-musk-style');
  });

  it('should expose the initialized title signal and update its value', () => {
    const fixture = TestBed.createComponent(App);
    const title = (fixture.componentInstance as any).title;

    expect(title()).toBe('cv-musk-style');
    title.update((current: string) => `${current} CV`);
    expect(title()).toBe('cv-musk-style CV');
  });

  it('should render the CV sections', async () => {

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.card').length).toBe(6);
    expect(compiled.textContent).toContain('Experiencia Laboral');
    expect(compiled.textContent).toContain('Certificados');
  });
});

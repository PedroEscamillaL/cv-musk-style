import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { EducationService } from './education';

describe('Education', () => {
  let service: EducationService;

  const collection = {};
  const firestore = { collection: vi.fn(() => collection) };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: AngularFirestore, useValue: firestore }] });
    service = TestBed.inject(EducationService);
  });

  it('should be created and use the expected Firestore collection', () => {
    expect(service).toBeTruthy();
    expect(firestore.collection).toHaveBeenCalledWith('education');
    expect(service.getEducation()).toBe(collection);
  });
});

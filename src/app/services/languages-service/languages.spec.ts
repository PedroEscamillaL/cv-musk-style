import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { LanguagesService } from './languages';

describe('Languages', () => {
  let service: LanguagesService;

  const collection = {};
  const firestore = { collection: vi.fn(() => collection) };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: AngularFirestore, useValue: firestore }] });
    service = TestBed.inject(LanguagesService);
  });

  it('should be created and use the expected Firestore collection', () => {
    expect(service).toBeTruthy();
    expect(firestore.collection).toHaveBeenCalledWith('languages');
    expect(service.getLanguages()).toBe(collection);
  });
});

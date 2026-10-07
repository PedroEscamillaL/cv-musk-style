import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { InterestService } from './interest';

describe('Interest', () => {
  let service: InterestService;

  const collection = {};
  const firestore = { collection: vi.fn(() => collection) };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: AngularFirestore, useValue: firestore }] });
    service = TestBed.inject(InterestService);
  });

  it('should be created and use the expected Firestore collection', () => {
    expect(service).toBeTruthy();
    expect(firestore.collection).toHaveBeenCalledWith('interest');
    expect(service.getInterest()).toBe(collection);
  });
});

import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { HeaderService } from './header';

describe('Header', () => {
  let service: HeaderService;

  const collection = {};
  const firestore = { collection: vi.fn(() => collection) };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: AngularFirestore, useValue: firestore }] });
    service = TestBed.inject(HeaderService);
  });

  it('should be created and use the expected Firestore collection', () => {
    expect(service).toBeTruthy();
    expect(firestore.collection).toHaveBeenCalledWith('header');
    expect(service.getHeader()).toBe(collection);
  });
});

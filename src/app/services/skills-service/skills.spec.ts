import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { SkillsService } from './skills';

describe('Skills', () => {
  let service: SkillsService;

  const collection = {};
  const firestore = { collection: vi.fn(() => collection) };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: AngularFirestore, useValue: firestore }] });
    service = TestBed.inject(SkillsService);
  });

  it('should be created and use the expected Firestore collection', () => {
    expect(service).toBeTruthy();
    expect(firestore.collection).toHaveBeenCalledWith('skills');
    expect(service.getSkills()).toBe(collection);
  });
});

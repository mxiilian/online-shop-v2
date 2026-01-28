import { TestBed } from '@angular/core/testing';

import { PullData } from './pull-data';

describe('PullData', () => {
  let service: PullData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PullData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

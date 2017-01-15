/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContinentObserverService } from './continent-observer.service';

describe('ContinentObserverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContinentObserverService]
    });
  });

  it('should ...', inject([ContinentObserverService], (service: ContinentObserverService) => {
    expect(service).toBeTruthy();
  }));
});

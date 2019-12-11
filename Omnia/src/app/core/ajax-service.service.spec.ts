import { TestBed } from '@angular/core/testing';

import { AjaxServiceService } from './ajax-service.service';

describe('AjaxServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AjaxServiceService = TestBed.get(AjaxServiceService);
    expect(service).toBeTruthy();
  });
});

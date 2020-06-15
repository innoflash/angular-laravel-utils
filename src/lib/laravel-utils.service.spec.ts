import { TestBed } from '@angular/core/testing';

import { LaravelUtilsService } from './laravel-utils.service';

describe('LaravelUtilsService', () => {
  let service: LaravelUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaravelUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

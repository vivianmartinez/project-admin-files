import { TestBed } from '@angular/core/testing';

import { RouteFilesService } from './route-files.service';

describe('RouteFilesService', () => {
  let service: RouteFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

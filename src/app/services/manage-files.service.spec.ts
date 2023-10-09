import { TestBed } from '@angular/core/testing';

import { ManageFilesService } from './manage-files.service';

describe('ManageFilesService', () => {
  let service: ManageFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

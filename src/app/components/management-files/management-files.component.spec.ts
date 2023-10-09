import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementFilesComponent } from './management-files.component';

describe('ManagementFilesComponent', () => {
  let component: ManagementFilesComponent;
  let fixture: ComponentFixture<ManagementFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementFilesComponent]
    });
    fixture = TestBed.createComponent(ManagementFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

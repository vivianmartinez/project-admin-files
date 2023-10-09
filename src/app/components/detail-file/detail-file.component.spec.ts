import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFileComponent } from './detail-file.component';

describe('DetailFileComponent', () => {
  let component: DetailFileComponent;
  let fixture: ComponentFixture<DetailFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailFileComponent]
    });
    fixture = TestBed.createComponent(DetailFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

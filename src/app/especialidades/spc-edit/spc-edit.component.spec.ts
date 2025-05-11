import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpcEditComponent } from './spc-edit.component';

describe('SpcEditComponent', () => {
  let component: SpcEditComponent;
  let fixture: ComponentFixture<SpcEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpcEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpcCreateComponent } from './spc-create.component';

describe('SpcCreateComponent', () => {
  let component: SpcCreateComponent;
  let fixture: ComponentFixture<SpcCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpcCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpcCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpcListComponent } from './spc-list.component';

describe('SpcListComponent', () => {
  let component: SpcListComponent;
  let fixture: ComponentFixture<SpcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpcListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

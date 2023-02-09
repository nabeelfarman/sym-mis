import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairSetsComponent } from './repair-sets.component';

describe('RepairSetsComponent', () => {
  let component: RepairSetsComponent;
  let fixture: ComponentFixture<RepairSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

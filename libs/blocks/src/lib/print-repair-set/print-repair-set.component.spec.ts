import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRepairSetComponent } from './print-repair-set.component';

describe('PrintRepairSetComponent', () => {
  let component: PrintRepairSetComponent;
  let fixture: ComponentFixture<PrintRepairSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintRepairSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintRepairSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnoseTableComponent } from './diagnose-table.component';

describe('DiagnoseTableComponent', () => {
  let component: DiagnoseTableComponent;
  let fixture: ComponentFixture<DiagnoseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnoseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnoseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

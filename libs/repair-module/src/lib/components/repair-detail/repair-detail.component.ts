import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';
import { DetailTableComponent } from 'libs/table-block/src/lib/repair-module/detail-table/detail-table.component';

@Component({
  selector: 'sym-mis-repair-detail',
  templateUrl: './repair-detail.component.html',
  styleUrls: ['./repair-detail.component.scss']
})
export class RepairDetailComponent implements OnInit {

  constructor(
    private globalService: SharedServicesGlobalDataModule
    ) { }

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Pending Repairs');

  }
  
}

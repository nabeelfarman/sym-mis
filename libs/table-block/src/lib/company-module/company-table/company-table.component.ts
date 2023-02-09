import { Component, OnInit } from '@angular/core';
import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { CompanyInterface } from '@sym-mis/shared/interface';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';

@Component({
  selector: 'sym-mis-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {
  dataLength: number | undefined;
  tableData: CompanyInterface[] | undefined;
  deptList: any[] | undefined;
  permission = "011";

  constructor(private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,) {}

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany(){
    this.dataService.getHttp('companies/?OwnerID='+ this.globalService.getUserId().toString(), '').subscribe((response: any) => {
      this.tableData = response.data;
    }, (error: any) => {
      console.log(error);
    });
  }
}

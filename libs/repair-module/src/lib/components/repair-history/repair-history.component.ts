import { Component, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@sym-mis/shared/helpers/field-validations';
import { RepairInterface } from '@sym-mis/shared/interface';
import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';

@Component({
  selector: 'sym-mis-repair-history',
  templateUrl: './repair-history.component.html',
  styleUrls: ['./repair-history.component.scss']
})
export class RepairHistoryComponent implements OnInit {
  tblSearch: string = "";

  ddlCompany: string = "";
  companyList: any = [];
  tableData: RepairInterface[] | undefined;

  constructor(    
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
) { }

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Repair Delivered History');

    this.getCompany();
  }

  // get meta data
  getCompany() {
    if(this.globalService.getRole() == 'Admin'){
      this.dataService
      .getHttp('companies/?OwnerID='+ this.globalService.getUserId().toString(), '')
      .subscribe((data: any) => {
        this.companyList = data.data;
      });
    }else{
      this.dataService
      .getHttp('company-staff-detail/?UserID='+ this.globalService.getUserId().toString(), '')
      .subscribe((data: any) => {
        this.companyList = data.data;
        this.ddlCompany = data.data[0].CompanyID;
        
        this.getRepair(this.ddlCompany);
      });
    }
  }

  getRepair(companyID: any){
    this.dataService.getHttp('delivered_repair/?CompanyID=' + companyID, '').subscribe((response: any) => {
      
      this.tableData = response.data;
    }, (error: any) => {
      console.log(error);
    });

  }

}

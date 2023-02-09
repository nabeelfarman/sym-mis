import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedHelpersFieldValidationsModule } from '@sym-mis/shared/helpers/field-validations';
import { RepairInterface } from '@sym-mis/shared/interface';
import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';
import { DialogComponent } from 'libs/blocks/src/lib/dialog/dialog.component';
import { PrintRepairSetComponent } from 'libs/blocks/src/lib/print-repair-set/print-repair-set.component';

@Component({
  selector: 'sym-mis-repair-sets',
  templateUrl: './repair-sets.component.html',
  styleUrls: ['./repair-sets.component.scss']
})
export class RepairSetsComponent implements OnInit {

  @ViewChild(PrintRepairSetComponent) printTable: any;

  tblSearch: string = "";

  amntPaid: any;
  totAmnt: any;
  dtp: any;

  ddlCompany: string = "";
  companyList: any = [];
  tableData: RepairInterface[] | undefined;

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Repair Sets');

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
    this.dataService.getHttp('comp_repair/?CompanyID=' + companyID, '').subscribe((response: any) => {
      
      this.tableData = response.data;
    }, (error: any) => {
      console.log(error);
    });

  }

  updateRepairStatus(item: any){
    var ddtp = new Date();
    if(item.amountPaid >= item.TotalBill){
      this.dataService.updateHttp('repair-delivered/?RepairID=' + item.RepairID + "&AmountPaid="+item.amountPaid)
      .subscribe((response: any) => {
        var amount = parseInt(item.amountPaid) - parseInt(item.TotalBill);
        // this.dialog.open(DialogComponent, {
        //   width: '350px',
        //   data: {text: "Remaining Balance ", ID: amount}
        // });
        this.valid.apiInfoResponse('record updated successfully');
        
        this.printTable.lblTotalAmount = item.TotalBill;
        this.printTable.lblAmountPaid = item.amountPaid;
        this.printTable.lblDate = ddtp;
  
        setTimeout(()=>
          this.printTable.printData()
        , 100);
          
        this.getRepair(item.CompanyID);
  
      },
      (error: any) => {
        this.error = error;
        this.valid.apiErrorResponse(this.error);
      });
    }else{
      this.valid.apiErrorResponse('Payment amount not matched');
    }
    
  
  }

}

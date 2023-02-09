import { Component, OnInit } from '@angular/core';

import { DiagnoseInterface } from '@sym-mis/shared/interface';

import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { SharedHelpersFieldValidationsModule } from '@sym-mis/shared/helpers/field-validations';

@Component({
  selector: 'sym-mis-diagnose-table',
  templateUrl: './diagnose-table.component.html',
  styleUrls: ['./diagnose-table.component.scss']
})
export class DiagnoseTableComponent implements OnInit {

  totalCost: number = 0;
  dataLength: number | undefined;
  tableData: DiagnoseInterface[] | undefined;
  permission = "011";

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
    ) { }

  ngOnInit(): void {
    
    this.getDiagnose();
  }

  getDiagnose(){
    this.dataService.getHttp('diagnose/?RepairID=' + localStorage.getItem('repairID'), '').subscribe((response: any) => {
      
      this.tableData = response.data;

      if(response.data.length > 0)
      {
        var count = 0;
        this.totalCost = 0;
  
        for(var i=0; i<response.data.length; i++){
          this.totalCost += response.data[i].Cost;
          if(response.data[i].IssueStatus == "PENDING"){
            count = 1;
          }
        }
  
        if(count == 0){
          this.updateRepairStatus();
        }
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  updateRepairStatus(){
    // alert('ok')
    this.dataService.updateHttp('repair/change-status/?RepairID=' + localStorage.getItem('repairID'))
    .subscribe((response: any) => {
      // console.log(response);
    },
    (error: any) => {
      this.error = error;
      this.valid.apiErrorResponse(this.error);
    });
  
  }

  editDiagnose(item: any, status: any){
    if(status == "REFUSAL")
    {
      this.dataService.updateHttp('diagnose/refusal/?DiagnoseID=' + item.DiagnoseID).subscribe((response: any) => {
        this.valid.apiInfoResponse('record updated successfully');
        
        this.getDiagnose();
      }, (error: any) => {
        console.log(error);
      });
    }else{
      this.dataService.updateHttp('diagnose/change-status/?DiagnoseID=' + item.DiagnoseID).subscribe((response: any) => {
        this.valid.apiInfoResponse('record updated successfully');
        
        this.getDiagnose();
      }, (error: any) => {
        console.log(error);
      });
    }
    
  }

  deleteDiagnose(item: any){
    this.dataService.deleteHttp('diagnose/?DiagnoseID=' + item.DiagnoseID).subscribe((response: any) => {
      this.valid.apiInfoResponse('record delete successfully');
      
      this.getDiagnose();
    }, (error: any) => {
      console.log(error);
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MyFormField, DiagnoseInterface } from '@sym-mis/shared/interface';

import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { SharedHelpersFieldValidationsModule } from '@sym-mis/shared/helpers/field-validations';
import { DiagnoseTableComponent } from 'libs/table-block/src/lib/repair-module/diagnose-table/diagnose-table.component';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';
import { CustomerInfoComponent } from 'libs/blocks/src/lib/customer-info/customer-info.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sym-mis-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss']
})
export class DiagnoseComponent implements OnInit {

  @ViewChild(DiagnoseTableComponent) diagnoseTable: any;

  pageFields = {} as DiagnoseInterface;

  formFields: MyFormField[] = [
    {
      value: this.pageFields.RepairID,
      msg: '',
      type: 'hidden',
      required: false
    },
    {
      value: this.pageFields.DiagnoseID,
      msg: '',
      type: 'hidden',
      required: false
    },
    {
      value: this.pageFields.Issue,
      msg: 'enter problem identify',
      type: 'textbox',
      required: true
    },
    {
      value: this.pageFields.Description,
      msg: 'enter descripiotn',
      type: 'textbox',
      required: true
    },
    {
      value: this.pageFields.Cost,
      msg: 'enter cost',
      type: 'textbox',
      required: true
    },
    {
      value: this.pageFields.IssueStatus,
      msg: '',
      type: 'hidden',
      required: false
    }
  ];
  
  error: any;

  diagnoseList: any = [];

  custName: any;
  model: any;
  mobile: any;
  imei: any;
  clickEventSubscription: Subscription;

  constructor(    
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
    ) {
      
      this.clickEventSubscription = this.globalService.getCustomerInfo().subscribe((data: any)=>{
        
        this.custName = data.CustomerName;
        this.mobile = data.MobileNo;
        this.imei = data.IMEI;
        this.model = data.Model;

      })
    }

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Diagnose');

    this.pageFields = {
      RepairID: '0',
      DiagnoseID: '0',
      Issue: '',
      Description: '',
      Cost: '',
      IssueStatus: ''
    };
  
    this.formFields[0].value = localStorage.getItem('repairID');

  }

  saveDiagnose(){
    this.dataService.savetHttp(this.pageFields, this.formFields, 'diagnose')
    .subscribe((response: any) => {
      this.valid.apiInfoResponse('record saved successfully');
      
      this.diagnoseTable.getDiagnose();

      this.reset();
    },
    (error: any) => {
      this.error = error;
      this.valid.apiErrorResponse(this.error);
    });
  
  }

  reset(){
    this.formFields = this.valid.resetFormFields(this.formFields);
  }
}

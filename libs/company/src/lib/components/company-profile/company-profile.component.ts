import { Component, OnInit, ViewChild } from '@angular/core';

import { MyFormField, CompanyInterface } from '@sym-mis/shared/interface';

import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';
import { SharedHelpersFieldValidationsModule } from '@sym-mis/shared/helpers/field-validations';
import { CompanyTableComponent } from 'libs/table-block/src/lib/company-module/company-table/company-table.component';

@Component({
  selector: 'sym-mis-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  
  @ViewChild(CompanyTableComponent) companyTable: any;

  company: CompanyInterface = {
    CompanyID: '0',
    CompanyName: '',
    Address: '',
    NTNNumber: '',
    OwnerID: '',
  };
  
  formFields: MyFormField[] = [
    {
      value: this.company.CompanyID,
      msg: '',
      type: 'hidden',
      required: false
    },
    {
      value: this.company.CompanyName,
      msg: 'enter company name',
      type: 'textBox',
      required: true
    },
    {
      value: this.company.Address,
      msg: 'enter company address',
      type: 'textBox',
      required: true
    },
    {
      value: this.company.NTNNumber,
      msg: 'enter ntn number',
      type: 'textBox',
      required: true
    },
    {
      value: this.company.OwnerID,
      msg: '',
      type: 'hidden',
      required: false
    },
  ];
  error: any;

  constructor(private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule){}


  ngOnInit(): void {
    this.globalService.setHeaderTitle('Outlet Creation');

    localStorage.removeItem('repairID');

  }

  saveCompany(){
    this.formFields[4].value = this.globalService.getUserId().toString();

    // this.setFormFieldsValidators();
    this.dataService.savetHttp(this.company, this.formFields, 'companies')
      .subscribe((response: any[]) => {
        this.valid.apiInfoResponse('company saved successfully');
        this.reset();
        this.companyTable.getCompany();
      },
      (error: any) => {
        this.error = error;
        this.valid.apiErrorResponse(this.error);
      });
    
  }

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);
  }
  
  setFormFieldsValidators() {
    this.formFields = [
      {
        value: this.company.CompanyID,
        msg: '',
        type: 'hidden',
        required: false
      },
      {
        value: this.company.CompanyName,
        msg: 'enter company name',
        type: 'textBox',
        required: true
      },
      {
        value: this.company.Address,
        msg: 'enter company address',
        type: 'textBox',
        required: true
      },
      {
        value: this.company.NTNNumber,
        msg: 'enter ntn number',
        type: 'textBox',
        required: true
      },
      // {
      //   value: this.company.OwnerID,
      //   msg: '',
      //   type: 'hidden',
      //   required: false
      // },
    ];
  }

}

import { Component, OnInit } from '@angular/core';

import { MyFormField, UserCreationInterface } from '@sym-mis/shared/interface';

import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';
import { SharedHelpersFieldValidationsModule } from '@sym-mis/shared/helpers/field-validations';

@Component({
  selector: 'sym-mis-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit {

  pageFields: UserCreationInterface = {
    FullName: '',
    Email: '',
    Password: '',
    Address: '',
    MobileNumber: '',
    CompanyId: '0',
    Permission: '',
    CreatedBy: '0',
    UserName: '',
  };

  companyList: any = [];

  formFields: MyFormField[] = [
    {
      value: this.pageFields.FullName,
      msg: 'enter user name',
      type: 'textbox',
      required: true
    },
    {
      value: this.pageFields.Email,
      msg: 'enter email',
      type: 'textBox',
      required: true
    },
    {
      value: this.pageFields.Password,
      msg: '',
      type: '',
      required: false
    },
    {
      value: this.pageFields.Address,
      msg: 'enter address',
      type: 'textBox',
      required: true
    },
    {
      value: this.pageFields.MobileNumber,
      msg: 'enter mobile number',
      type: 'textBox',
      required: true
    },
    {
      value: this.pageFields.CompanyId,
      msg: 'select repair center',
      type: 'selectBox',
      required: true
    },
    {
      value: this.pageFields.Permission,
      msg: 'select user role',
      type: 'selectBox',
      required: true
    },
    {
      value: this.pageFields.CreatedBy,
      msg: '',
      type: '',
      required: false
    },
    {
      value: this.pageFields.UserName,
      msg: '',
      type: '',
      required: false
    },
  ];
  error: any;

  constructor(private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule){}


  ngOnInit(): void {
    this.globalService.setHeaderTitle('User Creation');
    
    this.formFields[7].value = this.globalService.getUserId();
    this.getCompany();

  }
  
  // get meta data
  getCompany() {
    if(this.globalService.getUserId() != undefined){
      this.dataService
      .getHttp('companies/?OwnerID='+ this.globalService.getUserId().toString(), '')
      .subscribe((data: any) => {
        this.companyList = data.data;
      });
    }
  }

  saveUser(){
    var pw = this.formFields[0].value.substr(0,this.formFields[0].value.indexOf(' '));
    
    if(pw == ''){
      this.formFields[2].value = this.formFields[0].value + "@123";
      this.formFields[8].value = this.formFields[0].value;
    }else{
      this.formFields[2].value = pw + "@123";
      this.formFields[8].value = pw;
    }

    this.dataService.savetHttp(this.pageFields, this.formFields, 'staff')
      .subscribe((response: any[]) => {
        this.valid.apiInfoResponse('user saved successfully');
        console.log(response)
        this.formFields = this.valid.resetFormFields(this.formFields);

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

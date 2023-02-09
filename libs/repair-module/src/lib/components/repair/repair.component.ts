import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MyFormField, RepairInterface } from '@sym-mis/shared/interface';
import {MatDialog, throwMatDialogContentAlreadyAttachedError} from '@angular/material/dialog';

import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';
import { SharedHelpersFieldValidationsModule } from '@sym-mis/shared/helpers/field-validations';
import { DialogComponent } from 'libs/blocks/src/lib/dialog/dialog.component';
import { PrintTableComponent } from 'libs/blocks/src/lib/print-data/print-table/print-table.component';

declare var $: any;

export interface DialogData {
  text: string;
  ID: string;
}
@Component({
  selector: 'sym-mis-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss']
})
export class RepairComponent implements OnInit {

  @ViewChild(PrintTableComponent) printTable: any;

  RepID: any;
  companyName: any;
  companyAddress: any;
  CustName: any;
  Amnt: any;
  RepCenter: any;

  lblRepairID: any = '';
  lblComplaint: any = '';
  lblCompanyName: any = '';

  pageFields: RepairInterface = {
    RepairID: '0',
    CustomerName: '',
    CNIC: '',
    MobileNo: '',
    Item: '',
    Make: '',
    Model: '',
    IMEI: '',
    Description: '',
    CompanyID: '',
    CompanyName: '',
    AdvanceAmount: '',
    UserID: '0'
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.RepairID,
      msg: '',
      type: 'hidden',
      required: false
    },
    {
      value: this.pageFields.CustomerName,
      msg: 'enter customer name',
      type: 'textbox',
      required: true
    },
    {
      value: this.pageFields.CNIC,
      msg: 'enter cnic',
      type: 'textbox',
      required: false
    },
    {
      value: this.pageFields.MobileNo,
      msg: 'enter mobile no',
      type: 'textbox',
      required: true
    },
    {
      value: this.pageFields.Item,
      msg: 'enter item name',
      type: 'textbox',
      required: true
    },
    {
      value: this.pageFields.Make,
      msg: 'enter make',
      type: 'textbox',
      required: true
    },
    {
      value: this.pageFields.Model,
      msg: 'enter model',
      type: 'textbox',
      required: true
    },
    {
      value: this.pageFields.IMEI,
      msg: 'enter IMEI',
      type: 'textbox',
      required: false
    },
    {
      value: this.pageFields.Description,
      msg: 'enter description',
      type: 'textbox',
      required: true
    },
    {
      value: this.pageFields.CompanyID,
      msg: 'select company',
      type: 'selectbox',
      required: true
    },
    {
      value: this.pageFields.CompanyName,
      msg: '',
      type: 'hidden',
      required: false
    },
    {
      value: this.pageFields.AdvanceAmount,
      msg: 'enter Advance Amount',
      type: 'textbox',
      required: false
    },
    {
      value: this.pageFields.UserID,
      msg: '',
      type: 'hidden',
      required: false
    },
  ];
  
  error: any;

  companyList: any = [];
  
  constructor(private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Repair Form');

    this.getCompany();
    localStorage.removeItem('repairID');

  }
  
  // get meta data
  getCompany() {
    if(this.globalService.getUserId() != undefined){
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
          this.formFields[9].value = data.data[0].CompanyID;
        });
      }
    }
    
  }

  getCompanyName(item: any){
    var tempList;
    tempList = this.companyList.filter((x: { CompanyID: any; }) => x.CompanyID == item)
    
    this.formFields[10].value = tempList[0].CompanyName;
  }

  saveRepair(){
    console.log(this.companyList)
    this.dataService.savetHttp(this.pageFields, this.formFields, 'repair')
    .subscribe((response: any) => {
      // console.log(this.companyList);
      // alert(this.formFields[9].value);
      var data = this.companyList.filter((x: {CompanyID: any}) => x.CompanyID == this.formFields[9].value);
      console.log(response);
      this.lblRepairID = response.data[0].RepairID;
      this.lblComplaint = this.formFields[8].value;
      this.lblCompanyName = response.data[0].CompanyName;
      // this.printTable.lblCompanyName = data[0].CompanyName;
      // this.printTable.lblCompanyAddress = data[0].Address;
      // this.printTable.lblRepairID = response.data[0].RepairID;
      // this.printTable.lblCustomerName = response.data[0].CustomerName;
      // // this.printTable.lblAmount = response.data[0].RepID;
      // this.printTable.lblRepairCenter = response.data[0].CompanyName;

      setTimeout(()=>
        this.printData()
        // this.printTable.printData()
      , 100);

      // this.dialog.open(DialogComponent, {
      //   width: '350px',
      //   data: {text: "Please copy this RepairID ", ID: response.data[0].RepairID}
      // });
  
      this.valid.apiInfoResponse('record saved successfully');
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

  //print Asset Register Report
  printData() {

    var printCss = this.printCSS();

    var contents = $('#printDiv').html();

    var frame1 = $("<iframe />");
    frame1[0].name = "frame1";
    frame1.css({ position: "absolute", top: "-100px" });
    $("body").append(frame1);
    var frameDoc = frame1[0].contentWindow
      ? frame1[0].contentWindow
      : frame1[0].contentDocument.document
      ? frame1[0].contentDocument.document
      : frame1[0].contentDocument;
    frameDoc.document.open();

    //Create a new HTML document.
    frameDoc.document.write(
      "<html><head><title>DIV Contents</title>" +
        "<style>" +
        printCss +
        "</style>"
    );

    // //Append the external CSS file. <link rel="stylesheet" href="../../../styles.scss" /> <link rel="stylesheet" href="../../../../node_modules/bootstrap/dist/css/bootstrap.min.css" />
    // frameDoc.document.write(
    //   '<style type="text/css" media="print">@page { size: landscape; }</style>'
    // );
    // frameDoc.document.write(
    //   '<link rel="stylesheet" href="../../../../../ui/src/lib/styles/common.scss" type="text/css"  media="print"/>'
    // );
    frameDoc.document.write("</head><body>");

    //Append the DIV contents.
    frameDoc.document.write(contents);
    frameDoc.document.write("</body></html>");

    frameDoc.document.close();

    setTimeout(function () {

      window.frames[0].focus();
      window.frames[0].print();

      frame1.remove();
    }, 500);
  }

  public printCSS() {
    var commonCss =
      ".commonCss{font-family: Arial, Helvetica, sans-serif; text-align: center; }";

    var cssHeading = ".cssHeading {font-size: 25px; font-weight: bold;}";
    var cssAddress = ".cssAddress {font-size: 16px; }";
    var cssContact = ".cssContact {font-size: 16px; }";

    var tableCss =
      "table {width: 100%; border-collapse: collapse;}    table thead tr th {text-align: left; font-family: Arial, Helvetica, sans-serif; font-weight: bole; border-bottom: 1px solid black; margin-left: -3px;}     table tbody tr td {font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #ccc; margin-left: -3px; height: 33px;}";

    var printCss = commonCss + cssHeading + cssAddress + cssContact + tableCss;

    return printCss;
  }

}

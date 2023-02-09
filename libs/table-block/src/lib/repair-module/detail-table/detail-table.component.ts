import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';
import { RepairInterface } from '@sym-mis/shared/interface';
import { PrintTableComponent } from 'libs/blocks/src/lib/print-data/print-table/print-table.component';

declare var $: any;

@Component({
  selector: 'sym-mis-detail-table',
  templateUrl: './detail-table.component.html',
  styleUrls: ['./detail-table.component.scss']
})
export class DetailTableComponent implements OnInit {
  
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

  tblSearch: string = "";

  ddlCompany: string = "";
  companyList: any = [];

  dataLength: number | undefined;
  tableData: RepairInterface[] | undefined;
  permission = "011";

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private router: Router
    ) { }

  ngOnInit(): void {
    localStorage.removeItem('repairID');
    
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
    this.dataService.getHttp('repair/?CompanyID=' + companyID, '').subscribe((response: any) => {
      
      this.tableData = response.data;
    }, (error: any) => {
      console.log(error);
    });

  }

  printData(item: any){
  
    // console.log(item);return;

    this.lblRepairID = item.RepairID;
    this.lblComplaint = item.Description;
    this.lblCompanyName = item.CompanyName;
    // this.printTable.lblCompanyName = item.CompanyName;
    //   // this.printTable.lblCompanyAddress = item.Address;
    //   this.printTable.lblRepairID = item.RepairID;
    //   this.printTable.lblCustomerName = item.CustomerName;
    //   // this.printTable.lblAmount = response.data[0].RepID;
    //   this.printTable.lblRepairCenter = item.CompanyName;

    // // this.printTable.setTableData(item.CustomerName);
      setTimeout(()=>
        this.printDataDiv()
      , 100);
  }
  async sendDataToForm(item: any){
    this.globalService.setCustomerInfo(item);
    
    localStorage.setItem('repairID', item.RepairID);

    this.router.navigate(['rmis/diagnose']);

    
  }
  
  //print Asset Register Report
  printDataDiv() {

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

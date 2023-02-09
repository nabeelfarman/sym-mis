import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';

declare var $: any;

@Component({
  selector: 'sym-mis-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.scss']
})
export class PrintTableComponent implements OnInit {

  @Input() lblRepairID: any;
  @Input() lblCompanyName: any;
  @Input() lblCompanyAddress: any;
  @Input() lblCustomerName: any;
  @Input() lblAmount: any = 0;
  @Input() lblRepairCenter: any;

  @Input() tableID: any;

  // tableData: any = [];
  // clickEventSubscription: Subscription;

  constructor(private globalService: SharedServicesGlobalDataModule,) {
    
    // this.clickEventSubscription = this.globalService.getCustomerInfo().subscribe((data: any)=>{
        
    //   console.log(data.RepairID)
    //   console.log(data.CustomerName)
    //   console.log(data.Amount)
    //   console.log(data.RepairCenter)
    //   // {RepairID: '201a5fg480', CustomerName: '201a5fg480', Amount: '5000', RepairCenter: 'Symbia I-9/3'}
    //   this.lblRepairID = data.RepairID;
    //   this.lblCustomerName = data.CustomerName;
    //   this.lblAmount = data.Amount;
    //   this.lblRepairCenter = data.RepairCenter;

    // });
  }

  ngOnInit(): void {
    
  }

  // getTableData(){
  //   alert('ok');
  //   this.tableID = $('#repairTable').html();
  //   console.log(this.tableID)
  // }

  setTableData(item: any){
    // this.tableData = item;
    alert(item);return;
    this.printData()
  }

  //print Asset Register Report
  printData() {

    var printCss = this.printCSS();

    var contents = $('#repairTable').html();

    var frame1 = $("<iframe />");
    frame1[0].name = "frame1";
    frame1.css({ position: "absolute", top: "-1000000px" });
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

    var cssHeading = ".cssHeading {font-size: 30px; font-weight: bold; margin-left: 3em;}";
    var cssAddress = ".cssAddress {font-size: 20px; margin-left: 0.7em;}";
    var cssContact = ".cssMobile {font-size: 25px; margin-left: 4.5em;}";
    var cssLabHead = ".cssLabelHead {font-size: 25px; font-weight: bold;}";
    var cssLabel = ".cssLabel {font-size: 25px;}";
    var cssMargin = ".cssMarginTop {margin-top: 2em;} .cssMarginTop5 {margin-top: 5em;} .cssMargin1 {margin-left: 1em;} .cssMargin15 {margin-left: 1.5em;} .cssMargin2 {margin-left: 2em;} .cssMargin41 {margin-left: 4.1em;} .cssMargin6 {margin-left: 6em;}";

    // var tableCss =
    //   "table {width: 100%; border-collapse: collapse;}    table thead tr th {text-align: left; font-family: Arial, Helvetica, sans-serif; font-weight: bole; border-bottom: 1px solid black; margin-left: -3px;}     table tbody tr td {font-family: Arial, Helvetica, sans-serif; border-bottom: 1px solid #ccc; margin-left: -3px; height: 33px;}";

    var printCss = commonCss + cssHeading + cssAddress + cssContact + cssLabHead + cssLabel + cssMargin;

    return printCss;
  }

}

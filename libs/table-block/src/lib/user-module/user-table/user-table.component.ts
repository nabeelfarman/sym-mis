import { Component, OnInit } from '@angular/core';
import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';

@Component({
  selector: 'sym-mis-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  tableData: any = [];
  
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  
  getUsers(){
    this.dataService.getHttp('staff-detail/?CreatedBy=' + this.globalService.getUserId(), '').subscribe((response: any) => {
      
      this.tableData = response.data;
console.log(response.data);
    }, (error: any) => {
      console.log(error);
    });
  }


}

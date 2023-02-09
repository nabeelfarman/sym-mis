import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@sym-mis/material';
import { FormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BlocksModule } from '@sym-mis/blocks';

import { RepairTableComponent } from './repair-module/repair-table/repair-table.component';
import { DiagnoseTableComponent } from './repair-module/diagnose-table/diagnose-table.component';
import { DetailTableComponent } from './repair-module/detail-table/detail-table.component';
import { CompanyTableComponent } from './company-module/company-table/company-table.component';
import { UserTableComponent } from './user-module/user-table/user-table.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, Ng2SearchPipeModule,BlocksModule],
  declarations: [
    RepairTableComponent,
    DiagnoseTableComponent,
    DetailTableComponent,
    CompanyTableComponent,
    UserTableComponent
  ],
  exports:[
    RepairTableComponent,
    DiagnoseTableComponent,
    DetailTableComponent,
    CompanyTableComponent,
    UserTableComponent
  ]
})
export class TableBlockModule {}

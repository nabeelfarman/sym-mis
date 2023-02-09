import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@sym-mis/material';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { RepairComponent } from './components/repair/repair.component';
import { DiagnoseComponent } from './components/diagnose/diagnose.component';
import { RepairDetailComponent } from './components/repair-detail/repair-detail.component';


import { TableBlockModule } from '@sym-mis/table-block';
import { BlocksModule } from '@sym-mis/blocks';
import { RepairSetsComponent } from './components/repair-sets/repair-sets.component';
import { RepairHistoryComponent } from './components/repair-history/repair-history.component'
import { QRCodeModule } from 'angular2-qrcode';

export const repairRoutes: Route[] = [
  {path: 'repair', component: RepairComponent},
  {path: 'diagnose', component: DiagnoseComponent},
  {path: 'detail', component: RepairDetailComponent},
  {path: 'pHistory', component: RepairSetsComponent},
  {path: 'dHistory', component: RepairHistoryComponent},
]
@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(repairRoutes), 
    MaterialModule, 
    TableBlockModule, 
    FormsModule,
    BlocksModule,
    Ng2SearchPipeModule,
    QRCodeModule
  ],
  declarations: [
    RepairComponent,
    DiagnoseComponent,
    RepairDetailComponent,
    RepairSetsComponent,
    RepairHistoryComponent
  ],
})
export class RepairModule {}

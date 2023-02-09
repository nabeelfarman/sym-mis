import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '@sym-mis/material';
import { PrintTableComponent } from './print-data/print-table/print-table.component';
import { PrintRepairSetComponent } from './print-repair-set/print-repair-set.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    CustomerInfoComponent,
    DialogComponent,
    PrintTableComponent,
    PrintRepairSetComponent
  ],
  exports:[
    CustomerInfoComponent,
    PrintTableComponent,
    PrintRepairSetComponent
  ]
})
export class BlocksModule {}

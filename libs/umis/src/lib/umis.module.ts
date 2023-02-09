import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@sym-mis/material';
import { FormsModule } from '@angular/forms';

import { TableBlockModule } from '@sym-mis/table-block';
import { UserCreationComponent } from './user-creation/user-creation.component';

export const umisRoutes: Route[] = [
  {path: 'users', component: UserCreationComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(umisRoutes),
    MaterialModule, 
    FormsModule,
    TableBlockModule
  ],
  declarations: [
    UserCreationComponent
  ],
})
export class UmisModule {}

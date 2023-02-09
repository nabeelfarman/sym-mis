import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '@sym-mis/material';
import { FormsModule } from '@angular/forms';

import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { TableBlockModule } from '@sym-mis/table-block';

export const companyRoutes: Route[] = [
  {path: 'company', component: CompanyProfileComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(companyRoutes), MaterialModule, TableBlockModule, FormsModule],
  declarations: [
    CompanyProfileComponent
  ],
})
export class CompanyModule {}

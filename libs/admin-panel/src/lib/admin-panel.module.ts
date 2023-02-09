import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { MaterialModule } from '@sym-mis/material';

export const adminPanelRoutes: Route[] = [
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(adminPanelRoutes), ChartModule, MaterialModule],
  declarations: [
    DashboardComponent
  ],
})
export class AdminPanelModule {}

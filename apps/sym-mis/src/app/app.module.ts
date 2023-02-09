import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { TopSideNavComponent } from './layouts/top-side-nav/top-side-nav.component';
import { MaterialModule } from '@sym-mis/material';
import { LayoutsModule } from '@sym-mis/layouts';

import { AdminPanelModule, adminPanelRoutes } from '@sym-mis/admin-panel'
import { AuthModule, authRoutes } from '@sym-mis/auth'
import { RepairModule, repairRoutes } from '@sym-mis/repair-module';
import { CompanyModule, companyRoutes } from '@sym-mis/company';
import { UmisModule, umisRoutes } from '@sym-mis/umis';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './loader/interceptor.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AuthGuard } from '@sym-mis/shared/helpers/guards';

import { SharedServicesAuthModule } from '@sym-mis/shared/services/auth';
import { SharedHelpersFieldValidationsModule } from '@sym-mis/shared/helpers/field-validations';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';
import { SharedServicesDataModule } from '@sym-mis/shared/services/data';

// import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QRCodeModule } from 'angular2-qrcode';

export const appRoutes: Route[] = [
  {path: 'auth', children: authRoutes},
  // {path: 'amis', component: TopSideNavComponent, children: adminPanelRoutes},
  // {path: 'rmis', component: TopSideNavComponent, children: repairRoutes},
  // {path: 'cmis', component: TopSideNavComponent, children: companyRoutes},
  {path: 'amis', component: TopSideNavComponent, loadChildren: () => import('@sym-mis/admin-panel').then(m => m.AdminPanelModule), canLoad: [AuthGuard]},
  {path: 'rmis', component: TopSideNavComponent, loadChildren: () => import('@sym-mis/repair-module').then(m => m.RepairModule), canLoad: [AuthGuard]},
  {path: 'cmis', component: TopSideNavComponent, loadChildren: () => import('@sym-mis/company').then(m => m.CompanyModule), canLoad: [AuthGuard]},
  {path: 'umis', component: TopSideNavComponent, loadChildren: () => import('@sym-mis/umis').then(m => m.UmisModule), canLoad: [AuthGuard]},
  {path: '**', redirectTo: 'auth', pathMatch: 'full'},
];

@NgModule({
  declarations: [AppComponent, TopSideNavComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }),
    MaterialModule, 
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    LayoutsModule,
    AdminPanelModule,
    AuthModule,
    RepairModule,
    CompanyModule,
    SharedServicesAuthModule,
    SharedServicesDataModule,
    SharedHelpersFieldValidationsModule,
    SharedServicesGlobalDataModule,
    QRCodeModule,
    // ZXingScannerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

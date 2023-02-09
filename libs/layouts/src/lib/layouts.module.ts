import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopnavComponent } from './topnav/topnav.component';
import { MaterialModule } from '@sym-mis/material';

@NgModule({
  imports: [
      CommonModule,
      RouterModule,
      MaterialModule
    ],
  declarations: [
    FooterComponent,
    SidenavComponent,
    TopnavComponent
  ],
  exports: [
    TopnavComponent,
    SidenavComponent,
    FooterComponent
  ]
})
export class LayoutsModule {}

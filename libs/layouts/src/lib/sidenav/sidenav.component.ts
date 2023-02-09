import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';

@Component({
  selector: 'sym-mis-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  menuList: any = [];
  mainMenuList = [
    {
      menuID: 1,
      moduleID: 4,
      url: 'rmis/repair',
      menuName: 'Repair Form'
    },
    {
      menuID: 2,
      moduleID: 4,
      url: 'rmis/detail',
      menuName: ' Pending Repairs'
    },
    {
      menuID: 3,
      moduleID: 4,
      url: 'rmis/pHistory',
      menuName: 'Repair Sets'
    },
    {
      menuID: 4,
      moduleID: 4,
      url: 'rmis/dHistory',
      menuName: 'Repair Delivered History'
    },
    {
      menuID: 5,
      moduleID: 1,
      url: 'amis/dashboard',
      menuName: 'Dashboard'
    },
    {
      menuID: 6,
      moduleID: 3,
      url: 'cmis/company',
      menuName: 'Outlet Creation'
    },
    {
      menuID: 7,
      moduleID: 2,
      url: 'umis/users',
      menuName: 'User Creation'
    },
  ]
  constructor(private globalService: SharedServicesGlobalDataModule) { }

  ngOnInit(): void {
    var tempList = this.mainMenuList;

    this.menuList = tempList.filter(x => x.moduleID == 4);
    this.globalService.menuData.subscribe((data: any)=>{

      if(data != '' && typeof(data) == 'number'){
        this.menuList = tempList.filter(x => x.moduleID == data);
      }
    })
  }
  
  openLink(page_title: string) {
    this.globalService.setHeaderTitle(page_title);
  }

}

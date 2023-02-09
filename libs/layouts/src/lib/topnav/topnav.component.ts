import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface } from '@sym-mis/shared/interface';
import { SharedServicesAuthModule } from '@sym-mis/shared/services/auth';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';

@Component({
  selector: 'sym-mis-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  @Output() public drawerToggle = new EventEmitter();

  clickEventSubscription: Subscription | undefined;

  menu_btn = 'menu';
  title = '';
  userName = '';
  tempUserName = '';
  userRole = '';
  currentUser!: UserInterface;

  frstMList: any = [];
  scndMList: any = [];
  thrdMList: any = [];
  
  moduleList = [
    {
      moduleId: 1,
      moduleName: 'Dashboard Module',
      icon: 'speed',
      role: ['Admin']
    },
    {
      moduleId: 4,
      moduleName: 'Repair Module',
      icon: 'handyman',
      role: ['Admin', 'Staff']
    },
    {
      moduleId: 3,
      moduleName: 'Company Module',
      icon: 'corporate_fare',
      role: ['Admin']
    },
    {
      moduleId: 2,
      moduleName: 'User Module',
      icon: 'supervised_user_circle',
      role: ['Admin']
    },
    // {
    //   moduleId: 5,
    //   moduleName: 'Inventory',
    //   icon: 'inventory',
    //   role: ['Admin', 'Staff']
    // }
  ];

  constructor(
    private router: Router,
    private authService: SharedServicesAuthModule,
    private globalService: SharedServicesGlobalDataModule,
  ) { }

  ngOnInit(): void {
    var tempList = this.moduleList;

    this.globalService.header_title$.subscribe((str: string) => {
      this.title = str;
    });

    // alert(this.globalService.getRole());
    if(this.globalService.getRole() == undefined){
    //   // console.log("TopNav:    ");

      this.globalService.menuData.subscribe((data: any)=>{


        if(data.length > 0){
          console.log(tempList)

          this.userRole = data[0].role;
          this.moduleList = tempList.filter(x => x.role.includes(data[0].role));

          this.userName = data[0].name;

        }else{
          this.globalService.userRole.subscribe((data: any)=>{
            this.userRole = data;

            this.moduleList = tempList.filter(x => x.role.includes(this.userRole));

          });
        }
        
        if(this.userName == ''){
          this.globalService.userName.subscribe((data: any)=>{
            this.userName = data;
          });
        }
      })
    }else{
      this.moduleList = tempList.filter(x => x.role.includes(this.globalService.getRole()));
  

      this.userName = this.globalService.getUserName();
    }
  
    // for(var i = 0; i < this.moduleList.length; i++){
    //   if(this.frstMList.length == 0){
    //     this.frstMList.push({
    //       moduleId: this.moduleList[i].moduleId,
    //       moduleName: this.moduleList[i].moduleName,
    //       icon: this.moduleList[i].icon,
    //       role: this.moduleList[i].role
    //     })
    //   } else if(this.frstMList.length != 0 && this.scndMList.length == 0)
    //   {
    //     this.scndMList.push({
    //       moduleId: this.moduleList[i].moduleId,
    //       moduleName: this.moduleList[i].moduleName,
    //       icon: this.moduleList[i].icon,
    //       role: this.moduleList[i].role
    //     })
    //   } else if(this.frstMList.length != 0 && this.scndMList.length != 0 && this.thrdMList.length == 0)
    //   {
    //     this.thrdMList.push({
    //       moduleId: this.moduleList[i].moduleId,
    //       moduleName: this.moduleList[i].moduleName,
    //       icon: this.moduleList[i].icon,
    //       role: this.moduleList[i].role
    //     })
    //   }
    //   else if(this.frstMList.length > this.scndMList.length && this.scndMList.length == this.thrdMList.length)
    //   {
    //     this.frstMList.push({
    //       moduleId: this.moduleList[i].moduleId,
    //       moduleName: this.moduleList[i].moduleName,
    //       icon: this.moduleList[i].icon,
    //       role: this.moduleList[i].role
    //     })
    //   }
    //   else if(this.scndMList.length > this.thrdMList.length && this.scndMList.length == this.frstMList.length)
    //   {
    //     this.scndMList.push({
    //       moduleId: this.moduleList[i].moduleId,
    //       moduleName: this.moduleList[i].moduleName,
    //       icon: this.moduleList[i].icon,
    //       role: this.moduleList[i].role
    //     })
    //   } else{
    //     this.thrdMList.push({
    //       moduleId: this.moduleList[i].moduleId,
    //       moduleName: this.moduleList[i].moduleName,
    //       icon: this.moduleList[i].icon,
    //       role: this.moduleList[i].role
    //     })
    //   }
    // }  
  }

  public onToggleDrawer = () => {
    this.drawerToggle.emit();

    if (this.menu_btn == 'menu') {
      this.menu_btn = 'menu_open';
    } else if (this.menu_btn == 'menu_open') {
      this.menu_btn = 'menu';
    }
  };

  
  async logout() {
    await this.authService.logout();
    this.router.navigate(['auth/login']);
  }

  setSidebarMenu(selectedModule: any) {
    
    this.globalService.setUserName(this.userName);
    this.globalService.setRole(this.userRole);

    this.globalService.setMenuItems(selectedModule.moduleId);
    

    if (this.menu_btn == 'menu') {
      this.drawerToggle.emit();
      this.menu_btn = 'menu_open';
    }
  }

}

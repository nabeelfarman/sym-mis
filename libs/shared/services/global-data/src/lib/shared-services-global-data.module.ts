import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { SharedServicesAuthModule } from '@sym-mis/shared/services/auth';
import { SharedServicesDataModule } from '@sym-mis/shared/services/data';
import { UserInterface } from '@sym-mis/shared/interface';
import { Router } from '@angular/router';

@NgModule({
  imports: [CommonModule],
})
export class SharedServicesGlobalDataModule {
  currentUser = {} as UserInterface;

  private subject = new Subject<any>();

  private subjectCustomerInfo = new BehaviorSubject<any>('');

  private subjectMenuItem = new BehaviorSubject<any>('');
  menuData = this.subjectMenuItem.asObservable();

  private subjectUserName = new BehaviorSubject<any>('');
  userName = this.subjectUserName.asObservable();

  private subjectUserRole = new BehaviorSubject<any>('');
  userRole = this.subjectUserRole.asObservable();

  private _headerTitleSource = new Subject<string>();
  header_title$ = this._headerTitleSource.asObservable();

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading$$.asObservable();

  constructor(
    private router: Router,
    private authService: SharedServicesAuthModule, 
    private dataService: SharedServicesDataModule) {}


  setHeaderTitle(title:string){
    this._headerTitleSource.next(title);
  }

  setUserName(name: string){
    this.subjectUserName.next(name);
  }

  setRole(role: string){
    this.subjectUserRole.next(role);
  }

  setLoadingIndicator(value: boolean) {
    this.isLoading$$.next(value);
  }

  getUserId(): number {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      return this.currentUser.UserID;
    } else {
      return 0;
    }
  }

  getUserName(): string {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      return this.currentUser.FullName;
    } else {
      return '';
    }
  }
  
  getRole(): string {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser) {
      return this.currentUser.Permission;
    } else {
      return '';
    }
  }

  setMenuItems(item: any){
    // console.log(item);
    this.subjectMenuItem.next(item);
  }

  // getMenuItems():Observable<any>{
  //   alert('menu');
  //   return this.subject.asObservable();
  // }

  checkRouterUrl(listItems: any, routerUrl: any){

    var pRoute = routerUrl.split('/')[1];
    var cRoute = routerUrl.split('/')[2];

    var row = listItems.filter((m: { parentRoute: any; routeTitle: any; }) => 
                        m.parentRoute == pRoute && m.routeTitle == cRoute)

    if(row.length == 0){
      this.router.navigate(['/home']);
    }else{
      // console.log(row)
      this.setPermission(row);
    }
  }

  setPermission(item: any){
    this.subject.next(item);
  }

  getPermission():Observable<any>{
    return this.subject.asObservable();
  }

  setCustomerInfo(item: any){
    this.subjectCustomerInfo.next(item);
  }

  getCustomerInfo():Observable<any>{
    return this.subjectCustomerInfo.asObservable();
  }

}

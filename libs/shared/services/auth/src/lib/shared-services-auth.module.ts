import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInterface } from '@sym-mis/shared/interface';
import { map } from 'rxjs/operators';

export const sharedServicesAuthRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
})
export class SharedServicesAuthModule {
  private currentUserSubject: BehaviorSubject<UserInterface>;
  public currentUser: Observable<UserInterface>;
  public url = "https://symmi-be.symcloud.net/";
  // public url = "http://192.168.5.142:80/";

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<UserInterface>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserInterface {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<UserInterface>(this.url+'owner/login', {
        Email: email,
        Password: password,
      })
      .pipe(
        map((user: any) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.currentUserSubject.next(user.data);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // alert('shared service funtion')

  }
}

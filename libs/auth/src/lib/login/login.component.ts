import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServicesAuthModule } from '@sym-mis/shared/services/auth';
import { first } from 'rxjs/operators';
import { SharedHelpersFieldValidationsModule } from '@sym-mis/shared/helpers/field-validations';
import { SharedServicesGlobalDataModule } from '@sym-mis/shared/services/global-data';

@Component({
  selector: 'sym-mis-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validate: any[] = [];
  hide = true;
  email = '';
  password = '';
  error = '';

  divValue = 'SignIn';

  constructor(
    private authService: SharedServicesAuthModule,
    private toastr: SharedHelpersFieldValidationsModule,
    private router: Router,
    private globalService: SharedServicesGlobalDataModule
    ) { }

  ngOnInit(): void {
    localStorage.removeItem('repairID');

  }

  checkAccount(value: any){
    if(value == 'SignIn')
    {
      this.divValue = 'SignIn';
    } else if(value == 'SignUp')
    {
      this.divValue = 'SignUp';
    }
  }

  login(){
    this.validate = [
      { 
        value: this.email, 
        msg: 'enter user name or email',
        type: 'textBox',
        required: true,
      },
      { 
        value: this.password, 
        msg: 'enter password',
        type: 'textBox',
        required: true,
      },
    ];
    
    if (this.toastr.validateToastr(this.validate) == true) {
      this.authService
          .login(this.email, this.password)
          .pipe(first())
          .subscribe(
            (data) => {

              console.log(data);
              if(data.Message == "Success"){
                this.toastr.apiSuccessResponse("User Login Successfully");

                var tempList = [{
                  name: data.data.OwnerName,
                  role: data.data.Permission,
                }]
                this.globalService.setMenuItems(tempList);

                this.router.navigate(['amis/dashboard']);
              }else{
                this.toastr.apiErrorResponse(data.Message);
                localStorage.removeItem('currentUser')
              }
              
            },
            (error) => {
              this.error = error.error.Message;
              this.toastr.apiErrorResponse(this.error)
            }
          );
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

//rxjs
import { Observable, Subject, throwError } from 'rxjs';
import { retry, catchError, takeUntil } from 'rxjs/operators';

//service
import { SharedHelpersFieldValidationsModule } from '@sym-mis/shared/helpers/field-validations';
import { MyFormField } from '@sym-mis/shared/interface';

// export const sharedServicesDataRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule],
})
export class SharedServicesDataModule {

  private baseURL = 'https://symmi-be.symcloud.net/';
  // private baseURL = 'http://192.168.5.142:80/';
  destory$: Subject<boolean> = new Subject<boolean>();

  //variables
  error = '';
  result: any = [];

  constructor(
    private http: HttpClient,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  //Http GET
  public getRequest(functionName: string, params: any): Observable<any> {
    return this.http
      .get(this.baseURL + functionName + params)
      .pipe(retry(3), catchError(this.handleError));
  }

  // Http POST
  public createRequest(functionName: string, data: any): Observable<any> {
    console.log("to send",data);
    return this.http
      .post(this.baseURL + functionName, data)
      .pipe(retry(3), catchError(this.handleError));
  }

  // Http PUT
  public updateRequest(functionName: string, data: any) {
    return this.http
      .put(this.baseURL + functionName, data)
      .pipe(retry(3), catchError(this.handleError));
  }

  // HttpDelete
  public deleteRequest(functionName: string, params: string) {
    return this.http
      .delete(this.baseURL + functionName)
      .pipe(retry(3), catchError(this.handleError));
  }

  // http Error Handling
  handleError(error: HttpErrorResponse) {
    // alert('catch error');

    let errorMessage = 'Unknown Error!';

    if (error.error instanceof ErrorEvent) {
      // client side error
      errorMessage = 'Error: ${error.error.message}';
    } else {
      // server side error
      errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }

    this.valid.apiErrorResponse(errorMessage);
    console.log(errorMessage);
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  //////////////////////////////////
  // CRUD Operation
  //////////////////////////////////

  // get Function
  public getHttp(url: string, param: any): any {
    this.result = [];
    return this.getRequest(url, param).pipe(takeUntil(this.destory$));
  }

  public savetHttp(
    pageInterface: any,
    formFields: MyFormField[],
    url: string
  ): any {

    if (this.valid.validateToastr(formFields) == true) {

      // set page interface
      pageInterface = this.setInterface(pageInterface, formFields);

      // save
      // if (formFields[0].value == '0') {
      //   pageInterface.spType = 'insert';
      // } else {
      //   pageInterface.spType = 'update';
      // }
      console.log(pageInterface);
      return this.createRequest(url, pageInterface).pipe(
        takeUntil(this.destory$)
      );
    }
  }

  public updateHttp(
    url: string
  ): any {

    return this.updateRequest(url, '').pipe(
      takeUntil(this.destory$)
    );
  }
  
  public deleteHttp(
    url: string
  ): any {

    return this.deleteRequest(url, '').pipe(
      takeUntil(this.destory$)
    );
  }

  setInterface(pageInterface: Array<any>, formFields: MyFormField[]): any {
    const headers: Array<any> = Object.keys(pageInterface).map((key) => {
      return { header: key };
    });

    // console.log(headers);
    // console.log(formFields);return
    for (var i = 0; i < headers.length; i++) {
      if (formFields[i].type == 'datePicker') {
        formFields[i].value = this.valid.dateFormat(formFields[i].value);
      }

      // if(i < formFields.length){
        pageInterface[headers[i]['header']] = formFields[i].value;
      // }
    }
    return pageInterface;
  }
}

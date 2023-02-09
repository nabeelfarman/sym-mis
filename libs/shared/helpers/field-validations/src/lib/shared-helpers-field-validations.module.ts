import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Route } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

// app elements
import { MyFormField } from '@sym-mis/shared/interface';

export const sharedHelpersFieldValidationsRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
  ],
  providers: [DatePipe],
})
export class SharedHelpersFieldValidationsModule {
  private found!: boolean;

  constructor(private toastr: ToastrService, private datePipe: DatePipe) {}

  showToastr() {
    this.toastr.success('Yahoo ho gaya kaam!');
  }

  validateToastr(validate: MyFormField[]): boolean {
    this.found = true;
    // alert('validate:    '+validate.length)

    for (let i = 0; i < validate.length && this.found == true; i++) {
      if (
        (validate[i].value == '' ||
          validate[i].value == undefined ||
          validate[i].value == '0' ||
          validate[i].value == null) &&
        validate[i].required == true
      ) {
        this.toastr.info(validate[i].msg);
        this.found = false;
      }
      // alert('dor Loop:    '+this.found)
    }
    // alert(this.found);
    return this.found;
  }
    // api response send error msg rather than data
    apiErrorResponse(errorMsg: string) {
      this.toastr.error(errorMsg);
    }

    apiSuccessResponse(msg: string) {
      this.toastr.success(msg);
    }

    apiInfoResponse(msg: string) {
      this.toastr.info(msg);
    }

    resetFormFields(formFields: MyFormField[]): MyFormField[] {

      for (let i = 0; i < formFields.length; i++) {

        if (formFields[i].required == true) {
          formFields[i].value = '';
        }
      }
      return formFields;
    }

    // changeDateFormat
    dateFormat(date?: Date): string {
      return this.datePipe.transform(date, 'MM/dd/yyyy').toString();
    }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sym-mis-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {

  @Input() lblCustName: any;
  @Input() lblModel: any;
  @Input() lblPhone: any;
  @Input() lblIMEI: any;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
//NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, NzInputModule, NzSpinModule, NzFormModule, NzButtonModule, NzSelectModule, NzDatePickerModule, NzTableModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

  isSpinning = false;
  bookings: any

  constructor(private customerService: CustomerService) {
    this.getMyBookings();
  }



  getMyBookings() {
    this.isSpinning = true;
    this.customerService.getBookingsByUserId().subscribe((res) => {
      this.isSpinning = false;
      //console.log(res);
      this.bookings = res;
    });
  }

}

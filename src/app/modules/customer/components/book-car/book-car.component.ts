import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
//NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [RouterModule, CommonModule, NzLayoutModule, NzInputModule, NzButtonModule, NzFormModule, NzSpinModule, NzSelectModule, NzDatePickerModule, ReactiveFormsModule],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {

  carId: number = 0;
  car: any;
  processedImage: any;
  validateForm!: FormGroup;
  isSpinning = false;
  dateFormat = "dd-MM-YYYY";

  constructor(private customerService: CustomerService,
    private readonly activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required]
    })
    this.carId = this.activatedRoute.snapshot.params["id"];
    this.getCarById();
  }

  getCarById() {
    this.customerService.getCarById(this.carId).subscribe((res) => {
      console.log(res);
      this.processedImage = 'data:image/jpeg;base64,' + res.returnedImage;
      this.car = res;
    })
  }

  bookACar(data: any) {
    console.log(data);
    this.isSpinning = true;
    let obj = {
      fromDate: data.fromDate,
      toDate: data.toDate,
      userId: StorageService.getUserId(),
      carId: this.carId
    }
    this.customerService.bookACar(obj).subscribe({
      next: (res) => {
        this.isSpinning = false;
        console.log(res);
        this.message.success("Car booked successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/customer/dashboard");
      }, error: (err) => {
        this.isSpinning = false;
        this.message.error("Something went wrong", { nzDuration: 5000 });
      }
    });
  }

}

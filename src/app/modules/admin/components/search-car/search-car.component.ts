import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
//NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [RouterModule, NzLayoutModule, NzInputModule, NzButtonModule, NzFormModule, NzSpinModule, NzSelectModule, NzDatePickerModule, CommonModule, ReactiveFormsModule],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {
  cars: any = [];
  isSpinning = false;
  validateForm: FormGroup;
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder, private adminService: AdminService, private message: NzMessageService) {
    this.validateForm = this.fb.group({
      brand: [null],
      type: [null],
      color: [null],
      transmission: [null]
    })
  }

  searchCar() {
    this.isSpinning = true;
    this.adminService.searchCar(this.validateForm.value).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      res.carDtoList.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage; 
        this.cars.push(element);
      });
    })
  }

  deleteCar(id:number){
    this.cars=[];
    this.adminService.deleteCar(id).subscribe((res) => {
      this.message.success("Car deleted successfully", { nzDuration: 5000 });
      this.searchCar();
    })
  }

}

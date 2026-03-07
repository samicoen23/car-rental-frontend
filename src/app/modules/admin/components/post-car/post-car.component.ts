import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
//NG ZORRO IMPORTS
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [RouterModule, NzLayoutModule, NzInputModule, NzButtonModule, NzFormModule, NzSpinModule, NzSelectModule, NzDatePickerModule, CommonModule, ReactiveFormsModule],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {

  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder, private adminService: AdminService, private message: NzMessageService, private router: Router) { }

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      transmission: [null, Validators.required],
      color: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
      latitude: [null],
      longitude: [null],
    })
  }

  postCar() {
    console.log(this.postCarForm.value);
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('brand', this.postCarForm.controls['brand'].value);
    formData.append('name', this.postCarForm.controls['name'].value);
    formData.append('type', this.postCarForm.controls['type'].value);
    formData.append('color', this.postCarForm.controls['color'].value);
    //formData.append('year', this.postCarForm.controls['year'].value);
    const yearValue = this.postCarForm.controls['year'].value;
    const formattedYear =
      yearValue instanceof Date ? yearValue.getFullYear() : yearValue;
    formData.append('year', formattedYear.toString());

    formData.append('transmission', this.postCarForm.controls['transmission'].value);
    formData.append('description', this.postCarForm.controls['description'].value);
    formData.append('price', this.postCarForm.controls['price'].value);
    //formData.append('latitude', this.postCarForm.controls['latitude'].value);
    //formData.append('longitude', this.postCarForm.controls['longitude'].value);
    const lat = this.postCarForm.controls['latitude'].value;
    if (lat !== null && lat !== undefined) {
      formData.append('latitude', lat.toString());
    }

    const lng = this.postCarForm.controls['longitude'].value;
    if (lng !== null && lng !== undefined) {
      formData.append('longitude', lng.toString());
    }
    console.log(formData);
    this.adminService.postCar(formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Car posted successfully", { nzDuration: 5000 });
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    }, error => {
      this.message.error("Error while posting car", { nzDuration: 5000 });
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }
}

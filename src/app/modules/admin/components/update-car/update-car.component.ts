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
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [RouterModule, NzLayoutModule, NzInputModule, NzButtonModule, NzFormModule, NzSpinModule, NzSelectModule, NzDatePickerModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {

  carId: number = 0;
  isSpinning: boolean = false;
  updateForm!: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  selectedFile: File | null=null;
  imagePreview: string | ArrayBuffer | null=null;
  imageChanged: boolean = false;
  existingImage: string | null = null;

  constructor(private adminService: AdminService, private readonly activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private message: NzMessageService, private router: Router) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      transmission: [null, Validators.required],
      color: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    })
    this.carId = this.activatedRoute.snapshot.params["id"];
    this.getCarById();
  }

  getCarById() {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      //console.log(res);
      this.isSpinning = false;
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
      console.log(carDto);
      console.log(this.existingImage);
      this.updateForm.patchValue(carDto);
    })
  }

  updateCar() {
    console.log(this.updateForm.value);
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if(this.selectedFile){
    formData.append('image', this.selectedFile);
  }
    formData.append('brand', this.updateForm.controls['brand'].value);
    formData.append('name', this.updateForm.controls['name'].value);
    formData.append('type', this.updateForm.controls['type'].value);
    formData.append('color', this.updateForm.controls['color'].value);
    formData.append('year', this.updateForm.controls['year'].value);
    formData.append('transmission', this.updateForm.controls['transmission'].value);
    formData.append('description', this.updateForm.controls['description'].value);
    formData.append('price', this.updateForm.controls['price'].value);
    console.log(formData); 
    this.adminService.updateCar(this.carId, formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Car updated successfully", { nzDuration: 5000 });
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    }, error => {
      this.message.error("Error while updating car", { nzDuration: 5000 });
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imageChanged = true;
    this.existingImage = null;
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    if(this.selectedFile){
    reader.readAsDataURL(this.selectedFile);
    }
  }

}

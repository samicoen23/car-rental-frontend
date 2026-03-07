import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
//NG ZORRO IMPORTS
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NzButtonModule, RouterModule, NzSpinModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  cars: any = [];
  isSpinning = false;

  constructor(private adminService: AdminService, private message: NzMessageService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.isSpinning = true;
    this.adminService.getAllCars().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      res.forEach((element: { processedImg: string; returnedImage: string; }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    });
  }

  deleteCar(id: number) {
    this.adminService.deleteCar(id).subscribe((res) => {
      this.message.success("Car deleted successfully", { nzDuration: 5000 });
      this.cars = this.cars.filter((car: any) => car.id !== id);
    });
  }
}

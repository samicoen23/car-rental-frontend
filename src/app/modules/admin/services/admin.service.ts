import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

// const BASIC_URL = ["http://ec2-3-149-252-231.us-east-2.compute.amazonaws.com:8080"];
const BASIC_URL = ["http://localhost:8080"];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postCar(carDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/admin/car", carDto);
  }

  getAllCars(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/cars");
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + "/api/admin/car/" + id);
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/car/" + id);
  }

  updateCar(carId: number, carDto: any) {
    return this.http.put(BASIC_URL + "/api/admin/car/" + carId, carDto);
  }

  getCarBookings(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/car/bookings");
  }

  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http.get(BASIC_URL + `/api/admin/car/booking/${bookingId}/${status}`);
  }

  searchCar(searchCarDto: any): Observable<any> {
    return this.http.post(BASIC_URL + `/api/admin/car/search`, searchCarDto);
  }
}

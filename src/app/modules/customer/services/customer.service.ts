import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

// const BASIC_URL = ["http://ec2-3-149-252-231.us-east-2.compute.amazonaws.com:8080"]; 
const BASIC_URL = ["http://localhost:8080"];
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/cars");
  }

  getCarById(carId: number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/car/" + carId);
  }

  bookACar(bookACarDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/customer/car/book", bookACarDto);
  }

  getBookingsByUserId(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/car/bookings/" + StorageService.getUserId());
  }

  searchCar(searchCarDto: any): Observable<any> {
    return this.http.post(BASIC_URL + `/api/customer/car/search`, searchCarDto);
  }

}

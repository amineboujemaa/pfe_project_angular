import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';


const BASIC_URL = "http://localhost:9000";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/cars", {
      headers: this.createAuthorizationHeader()
    })
  }

  getCarById(carId: number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/car/" + carId, {
      headers: this.createAuthorizationHeader()
    })
  }

  getUserById(): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(BASIC_URL + "/api/customer/userUpdate/" + userId,{
      headers:this.createAuthorizationHeader()
    })
  }
  updateUser(updateUserResponse : any): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.put(BASIC_URL + "/api/customer/userUpdate/confirm/"+userId , updateUserResponse, {
      headers : this.createAuthorizationHeader()
    });
  }


  getBookingsByUserId(): Observable<any> {
    const userId = StorageService.getUserId();
    return this.http.get(BASIC_URL + "/api/customer/car/bookings/"+ userId, {
      headers: this.createAuthorizationHeader()
    })
  }

  getCommentByCarId(id: number): Observable<any> {
    return this.http.get(BASIC_URL+ "/api/customer/comments/"+id, {
      headers: this.createAuthorizationHeader()
    });
  }
  createComment(carId: number , content : string): Observable<any>{
    const userId = StorageService.getUserId();
    const commentRequestDto = {
      carId: carId,
      userId: userId,
      content: content
    };
    return this.http.post(BASIC_URL + "/api/customer/car/comment", commentRequestDto, {
      headers: this.createAuthorizationHeader()
    });
  }
  
  getCarsByUserId():Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(BASIC_URL +"/api/customer/car/myCars/"+ userId,{
      headers: this.createAuthorizationHeader()
    } )
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(BASIC_URL+ "/api/customer/car/myCars/delete/"+id, {
      headers: this.createAuthorizationHeader()
    });
  }
  
  searchCar(searchCarDto: any): Observable<any> {
    return this.http.post(BASIC_URL+"/api/customer/car/search", searchCarDto, {
      headers : this.createAuthorizationHeader()
    });
  }
  
  
  bookAVisit(bookAVisitDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/customer/car/book", bookAVisitDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  saveACar(savedCarDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/customer/car/save", savedCarDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getStat(): Observable<any> {
    const userId = StorageService.getUserId();
    return this.http.get(BASIC_URL +"/api/customer/car/stat/"+ userId,{
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken());

  }
}

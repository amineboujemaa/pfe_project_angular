import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';


const BASIC_URL = "http://localhost:9000";
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient){ }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(BASIC_URL+ "/api/admin/user/"+id, {
      headers: this.createAuthorizationHeader()
    });
  }

  userRoleChange(id: number): Observable<any> {
    return this.http.get(BASIC_URL+ "/api/admin/userRole/"+id, {
      headers: this.createAuthorizationHeader()
    });
  }
  postCar(carDto: any): Observable<any> {
    return this.http.post(BASIC_URL+"/api/admin/car", carDto, {
      headers : this.createAuthorizationHeader()
    });
  }
  
  getAllCars():Observable<any> {
    return this.http.get(BASIC_URL+"/api/admin/cars",{
      headers : this.createAuthorizationHeader()
    })
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(BASIC_URL+ "/api/admin/car/"+id, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCommentByCarId(id: number): Observable<any> {
    return this.http.get(BASIC_URL+ "/api/admin/comments/"+id, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(id: number): Observable<any>{
    return this.http.get(BASIC_URL + "/api/admin/car/"+id, {
      headers : this.createAuthorizationHeader()
    });
  }

  createComment(carId: number , content : string): Observable<any>{
    const userId = StorageService.getUserId();
    const commentRequestDto = {
      carId: carId,
      userId: userId,
      content: content
    };
    return this.http.post(BASIC_URL + "/api/admin/car/comment", commentRequestDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCar( carId : number,carDto : any): Observable<any>{
    return this.http.put(BASIC_URL + "/api/admin/car/"+carId, carDto, {
      headers : this.createAuthorizationHeader()
    });
  }

  getCarBookings():Observable<any> {
    return this.http.get(BASIC_URL+"/api/admin/car/bookings/",{
      headers : this.createAuthorizationHeader()
    })
  }

  showAllBookings():Observable<any> {
    return this.http.get(BASIC_URL+"/api/admin/car/all-bookings/",{
      headers : this.createAuthorizationHeader()
    })
  }

  searchCar(searchCarDto: any): Observable<any> {
    return this.http.post(BASIC_URL+"/api/admin/car/search", searchCarDto, {
      headers : this.createAuthorizationHeader()
    });
  }
  
  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/car/booking/${bookingId}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  
  getUserById(): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.get(BASIC_URL + "/api/admin/userUpdate/" + userId,{
      headers:this.createAuthorizationHeader()
    })
  }
  updateUser(updateUserResponse : any): Observable<any>{
    const userId = StorageService.getUserId();
    return this.http.put(BASIC_URL + "/api/admin/userUpdate/confirm/"+userId , updateUserResponse, {
      headers : this.createAuthorizationHeader()
    });
  }
 

  getStat(): Observable<any> {
    return this.http.get(BASIC_URL +"/api/admin/car/stat",{
      headers: this.createAuthorizationHeader()
    });
  }
  createAuthorizationHeader(): HttpHeaders{
    let authHeaers: HttpHeaders = new HttpHeaders();
    return authHeaers.set(
      'Authorization',
      'Bearer '+ StorageService.getToken());
    
  }

  getAllUsers():Observable<any> {
    return this.http.get(BASIC_URL+"/api/admin/users/",{
      headers : this.createAuthorizationHeader()
    })
  }

   
}

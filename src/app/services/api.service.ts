import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl="http://localhost:5000/productList";

  constructor(private http:HttpClient) { }


  postProduct(data:any){
    return this.http.post<any>(this.apiUrl,data);
  }
  getProducts(){
    return this.http.get<any>(this.apiUrl);
  }
  updateProduct(id:any,data:any){
    return this.http.put<any>(this.apiUrl+"/"+id,data)
  }
  deleteProduct(id:any){
    return this.http.delete<any>(this.apiUrl+"/"+id)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PosterRequest, PosterResponse } from 'src/app/interface/poster';

@Injectable({
  providedIn: 'root'
})
export class PosterService {
  private apiUrl = 'http://13.127.106.130:5001/api'; // Change to your API URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Tokeningizni qayerdan olishingizga qarab o'zgartirishingiz mumkin
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }


  getAll(): Observable<any> {
    const data = this.http.get(`${this.apiUrl}/posters`)
    return data
  }

  getById(id:number): Observable<any> {
    const data = this.http.get(`${this.apiUrl}/posters/${id}`)
    return data
  }

  deleteById(id:number | undefined): Observable<any> {
    const data = this.http.delete(`${this.apiUrl}/posters/${id}`, { headers: this.getHeaders() })
    return data
  }

  create(poster: any): Observable<any> {
    const data = this.http.post(`${this.apiUrl}/posters`, poster, { headers: this.getHeaders() })
    return data
  }

  update(id:number|undefined, poster: any): Observable<any> {
    const data = this.http.patch(`${this.apiUrl}/posters/${id}`, poster, { headers: this.getHeaders() })
    return data
  }
  
  getAllCategory(): Observable<any> {
    const data = this.http.get(`${this.apiUrl}/posters/category`)
    return data
  }

}

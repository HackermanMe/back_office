import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';
import { Marque } from '../../../../../models/marque';
import { GlobalResponse } from '../../../../../models/response/GlobalResponse';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  private apiUrl = environment.apiUrl + '/marques';

  constructor(private http: HttpClient) { }

  create(marque: { nom: string }): Observable<GlobalResponse<Marque>> {
    return this.http.post<GlobalResponse<Marque>>(this.apiUrl, marque);
  }

  findAll(): Observable<GlobalResponse<Marque[]>> {
    return this.http.get<GlobalResponse<Marque[]>>(this.apiUrl);
  }

  findByNom(nom: string): Observable<GlobalResponse<Marque>> {
    return this.http.get<GlobalResponse<Marque>>(`${this.apiUrl}/nom/${nom}`);
  }

  findById(id: string): Observable<GlobalResponse<Marque>> {
    return this.http.get<GlobalResponse<Marque>>(`${this.apiUrl}/${id}`);
  }

  update(id: string, marque: Marque): Observable<GlobalResponse<Marque>> {
    return this.http.put<GlobalResponse<Marque>>(`${this.apiUrl}/${id}`, marque);
  }

  delete(id: string): Observable<GlobalResponse<void>> {
    return this.http.delete<GlobalResponse<void>>(`${this.apiUrl}/${id}`);
  }
} 
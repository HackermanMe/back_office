import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modele } from '../../../../../models/modele';
import { environment } from '../../../../../../environments/environment.development';
import { GlobalResponse } from '../../../../../models/response/GlobalResponse';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
  private apiUrl = environment.apiUrl + '/modeles';

  constructor(private http: HttpClient) { }

  create(modele: { nom: string, marqueId: string }): Observable<GlobalResponse<Modele>> {
    return this.http.post<GlobalResponse<Modele>>(this.apiUrl, modele);
  }

  findAll(): Observable<GlobalResponse<Modele[]>> {
    return this.http.get<GlobalResponse<Modele[]>>(this.apiUrl);
  }

  findById(id: string): Observable<GlobalResponse<Modele>> {
    return this.http.get<GlobalResponse<Modele>>(`${this.apiUrl}/${id}`);
  }

  findByNom(nom: string): Observable<GlobalResponse<Modele>> {
    return this.http.get<GlobalResponse<Modele>>(`${this.apiUrl}/nom/${nom}`);
  }

  findByNomAndMarqueId(nom: string, marqueId: string): Observable<GlobalResponse<Modele>> {
    // Encodage des paramètres pour l'URL
    const encodedNom = encodeURIComponent(nom);
    const encodedMarqueId = encodeURIComponent(marqueId);
    return this.http.get<GlobalResponse<Modele>>(`${this.apiUrl}/nom/${encodedNom}/marque/tracking/${encodedMarqueId}`);
  }

  update(id: string, modele: Modele): Observable<GlobalResponse<Modele>> {
    return this.http.put<GlobalResponse<Modele>>(`${this.apiUrl}/${id}`, modele);
  }

  delete(id: string): Observable<GlobalResponse<void>> {
    return this.http.delete<GlobalResponse<void>>(`${this.apiUrl}/${id}`);
  }
}

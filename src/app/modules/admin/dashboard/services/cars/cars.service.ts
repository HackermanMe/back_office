import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';
import { Car } from '../../../../../models/cars';
import { GlobalResponse } from '../../../../../models/response/GlobalResponse';
import { CarRequest } from '../../../../../models/requests/car-request';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  // URL de base pour l'API des voitures
  private apiUrl = environment.apiUrl + '/cars';

  constructor(private http: HttpClient) { }

  // Créer une nouvelle voiture
  create(car: CarRequest): Observable<GlobalResponse<Car>> {
    // Créer un objet FormData pour envoyer les données
    const formData = new FormData();
    
    // Préparer les données de la voiture
    const carData = {
      titre: car.titre,
      modeleId: car.modeleId,
      marqueId: car.marqueId,
      prix: String(car.prix),
      annee: Number(car.annee),
      kilometrage: Number(car.kilometrage),
      puissance: Number(car.puissance),
      notemoyenne: 0.0,
      nombreavis: 0,
      couleur: car.couleur,
      typecarburant: car.typecarburant,
      transmission: car.transmission,
      caracteristiques: car.caracteristiques || [],
      description: car.description,
      negociable: car.negociable,
      paiementenplus: car.paiementenplus,
      echangepossible: car.echangepossible,
      reviewsIds: car.reviewsIds || [],
      modeleNom: car.modeleNom,
      marqueNom: car.marqueNom
    };

    // Ajouter les données de la voiture au formData
    formData.append('data', JSON.stringify(carData));
    
    // Ajouter les images une par une
    if (car.images && car.images.length > 0) {
      car.images.forEach((image, index) => {
        // Si c'est un fichier
        if (image instanceof File) {
          formData.append('images', image);
        }
      });
    }
    
    // Envoyer la requête au serveur
    return this.http.post<GlobalResponse<Car>>(this.apiUrl, formData);
  }

  // Récupérer toutes les voitures
  findAll(): Observable<GlobalResponse<Car[]>> {
    return this.http.get<GlobalResponse<Car[]>>(this.apiUrl);
  }

  // Récupérer une voiture par son ID
  findById(id: string): Observable<GlobalResponse<Car>> {
    return this.http.get<GlobalResponse<Car>>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une voiture
  update(id: string, car: Car): Observable<GlobalResponse<Car>> {
    return this.http.put<GlobalResponse<Car>>(`${this.apiUrl}/${id}`, car);
  }

  // Supprimer une voiture
  delete(id: string): Observable<GlobalResponse<void>> {
    return this.http.delete<GlobalResponse<void>>(`${this.apiUrl}/${id}`);
  }
}

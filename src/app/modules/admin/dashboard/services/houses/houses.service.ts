import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';
import { House } from '../../../../../models/house';
import { GlobalResponse } from '../../../../../models/response/GlobalResponse';
import { HouseRequest } from '../../../../../models/requests/house-request';

@Injectable({
  providedIn: 'root'
})
export class HousesService {
  private apiUrl = environment.apiUrl + '/houses';

  constructor(private http: HttpClient) { }

  create(house: HouseRequest): Observable<GlobalResponse<House>> {
    console.log('Début de la création de la maison:', house);
    const formData = new FormData();
    
    // Adapter les données pour le backend
    const houseData = {
      titre: house.titre,
      type: house.type,
      chambres: house.chambres,
      sallesdebain: house.sallesDeBain,
      surface: house.surface,
      adresse: house.adresse,
      ville: house.ville,
      district: house.district,
      description: house.description,
      prix: parseFloat(house.prix.toString()),
      negociable: house.negociable,
      paiementenplus: house.paiementEnPlus,
      caracteristiques: house.caracteristiques || [],
      agarage: house.aGarage,
      aparking: house.aParking,
      ajardin: house.aJardin,
      apiscine: house.aPiscine,
      aterrasse: house.aTerrasse,
      aascenseur: house.aAscenseur,
      anneeconstruction: house.anneeConstruction,
      notemoyenne: house.notemoyenne || 0.0,
      nombreavis: house.nombreavis || 0,
      itemtagsIds: house.itemTagsIds || [],
      reviewsIds: house.reviewsIds || [],
      proprietaireId: house.proprietaireId
    };

    console.log('Données préparées pour le backend:', houseData);

    // Ajouter les données JSON à FormData
    formData.append('data', JSON.stringify(houseData));
    
    // Ajouter les fichiers d'images s'ils existent
    if (Array.isArray(house.images) && house.images.length > 0) {
      console.log('Nombre d\'images à envoyer:', house.images.length);
      house.images.forEach((image, index) => {
        if (image instanceof File) {
          console.log('Ajout de l\'image', index + 1, ':', image.name);
          formData.append('images', image);
        }
      });
    } else {
      console.log('Aucune image à envoyer');
      formData.append('images', new Blob(), 'empty'); // Ajouter un fichier vide pour éviter l'erreur
    }

    // Afficher le contenu du FormData pour débogage
    formData.forEach((value, key) => {
      console.log('FormData -', key, ':', value);
    });

    console.log('Envoi de la requête à:', this.apiUrl);
    
    // Définir les headers pour multipart/form-data
    const headers = new HttpHeaders();
    // Ne pas définir Content-Type, le navigateur le fera automatiquement avec la boundary

    return this.http.post<GlobalResponse<House>>(
      this.apiUrl,
      formData,
      { headers }
    );
  }

  findAll(): Observable<GlobalResponse<House[]>> {
    return this.http.get<GlobalResponse<House[]>>(`${this.apiUrl}`);
  }

  findById(id: string): Observable<GlobalResponse<House>> {
    return this.http.get<GlobalResponse<House>>(`${this.apiUrl}/${id}`);
  }

  update(id: string, house: House): Observable<GlobalResponse<House>> {
    return this.http.put<GlobalResponse<House>>(`${this.apiUrl}/${id}`, house);
  }

  delete(id: string): Observable<GlobalResponse<void>> {
    return this.http.delete<GlobalResponse<void>>(`${this.apiUrl}/${id}`);
  }
} 
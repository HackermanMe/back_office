import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';
import { Land } from '../../../../../models/land';
import { GlobalResponse } from '../../../../../models/response/GlobalResponse';
import { LandRequest } from '../../../../../models/requests/land-request';

@Injectable({
  providedIn: 'root'
})
export class LandsService {
  private apiUrl = environment.apiUrl + '/lands';

  constructor(private http: HttpClient) { }

  create(land: LandRequest): Observable<GlobalResponse<Land>> {
    console.log('Début de la création du terrain:', land);
    const formData = new FormData();
    
    // Initialiser les tableaux pour stocker les URLs des fichiers
    const imageUrls: string[] = [];
    const docUrls: string[] = [];
    const certUrls: string[] = [];
    
    // Adapter les données pour le backend
    const landData = {
      titre: land.titre,
      surface: land.surface,
      adresse: land.adresse,
      ville: land.ville,
      district: land.district,
      description: land.description,
      prix: parseFloat(land.prix.toString()),
      negociable: land.negociable,
      paiementenplus: land.paiementEnPlus,
      aeau: land.aEau,
      aelectricite: land.aElectricite,
      constructible: land.constructible,
      caracteristiques: land.caracteristiques || [],
      images: imageUrls,
      documentsCadastraux: docUrls,
      certificatUrbanisme: certUrls,
      notemoyenne: land.noteMoyenne || 0.0,
      nombreavis: land.nombreAvis || 0,
      itemtagsIds: land.itemTagsIds || [],
      reviewsIds: land.reviewsIds || [],
      proprietaireId: land.proprietaireId
    };

    // Ajouter les fichiers d'images s'ils existent
    if (Array.isArray(land.images) && land.images.length > 0) {
      console.log('Nombre d\'images à envoyer:', land.images.length);
      land.images.forEach((image, index) => {
        if (image instanceof File) {
          console.log('Ajout de l\'image', index + 1, ':', image.name);
          formData.append('images', image);
          imageUrls.push('/images/' + image.name); // Ajouter l'URL attendue
        }
      });
    } else {
      console.log('Aucune image à envoyer');
      formData.append('images', new Blob(), 'empty');
    }

    // Ajouter les documents cadastraux s'ils existent
    if (Array.isArray(land.documentsCadastraux) && land.documentsCadastraux.length > 0) {
      console.log('Nombre de documents cadastraux à envoyer:', land.documentsCadastraux.length);
      land.documentsCadastraux.forEach((doc, index) => {
        if (doc instanceof File) {
          console.log('Ajout du document cadastral', index + 1, ':', doc.name);
          formData.append('documentsCadastraux', doc);
          docUrls.push('/documents/' + doc.name); // Ajouter l'URL attendue
        }
      });
    } else {
      console.log('Aucun document cadastral à envoyer');
      formData.append('documentsCadastraux', new Blob(), 'empty');
    }

    // Ajouter les certificats d'urbanisme s'ils existent
    if (Array.isArray(land.certificatUrbanisme) && land.certificatUrbanisme.length > 0) {
      console.log('Nombre de certificats d\'urbanisme à envoyer:', land.certificatUrbanisme.length);
      land.certificatUrbanisme.forEach((cert, index) => {
        if (cert instanceof File) {
          console.log('Ajout du certificat d\'urbanisme', index + 1, ':', cert.name);
          formData.append('certificatUrbanisme', cert);
          certUrls.push('/documents/' + cert.name); // Ajouter l'URL attendue
        }
      });
    } else {
      console.log('Aucun certificat d\'urbanisme à envoyer');
      formData.append('certificatUrbanisme', new Blob(), 'empty');
    }

    console.log('Données préparées pour le backend:', landData);

    // Ajouter les données JSON à FormData après avoir ajouté tous les fichiers
    formData.append('data', JSON.stringify(landData));

    // Afficher le contenu du FormData pour débogage
    formData.forEach((value, key) => {
      console.log('FormData -', key, ':', value);
    });

    console.log('Envoi de la requête à:', this.apiUrl);
    
    // Définir les headers pour multipart/form-data
    const headers = new HttpHeaders();

    return this.http.post<GlobalResponse<Land>>(
      this.apiUrl,
      formData,
      { headers }
    );
  }

  findAll(): Observable<GlobalResponse<Land[]>> {
    return this.http.get<GlobalResponse<Land[]>>(this.apiUrl);
  }

  findById(id: string): Observable<GlobalResponse<Land>> {
    return this.http.get<GlobalResponse<Land>>(`${this.apiUrl}/${id}`);
  }

  update(id: string, land: Land): Observable<GlobalResponse<Land>> {
    return this.http.put<GlobalResponse<Land>>(`${this.apiUrl}/${id}`, land);
  }

  delete(id: string): Observable<GlobalResponse<void>> {
    return this.http.delete<GlobalResponse<void>>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, status: string): Observable<GlobalResponse<Land>> {
    return this.http.put<GlobalResponse<Land>>(`${this.apiUrl}/${id}/status`, { status });
  }

  getStatus(): Observable<GlobalResponse<string[]>> {
    return this.http.get<GlobalResponse<string[]>>(`${this.apiUrl}/status`);
  }

  publishLand(id: string): Observable<GlobalResponse<Land>> {
    return this.http.put<GlobalResponse<Land>>(`${this.apiUrl}/${id}/publish`, {});
  }

  archiveLand(id: string): Observable<GlobalResponse<Land>> {
    return this.http.put<GlobalResponse<Land>>(`${this.apiUrl}/${id}/archive`, {});
  }
} 
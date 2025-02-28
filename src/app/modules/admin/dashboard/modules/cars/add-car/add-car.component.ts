import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarsService } from '../../../services/cars/cars.service';
import { ModeleService } from '../../../services/modele/modele.service';
import { MarqueService } from '../../../services/marque/marque.service';
import { FuelType } from '../../../../../../models/enums/FuelType';
import { TransmissionType } from '../../../../../../models/enums/TransmissionType';
import { Modele } from '../../../../../../models/modele';
import { CommonModule } from '@angular/common';
import { forkJoin, of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Marque } from '../../../../../../models/marque';
import { Car } from '../../../../../../models/cars';
import { GlobalResponse } from '../../../../../../models/response/GlobalResponse';
import { CarRequest } from '../../../../../../models/requests/car-request';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ]
})
export class AddCarComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  protected marques: Marque[] = [];
  protected modeles: Modele[] = [];
  protected filteredModeles: Modele[] = [];
  protected message: string = '';
  protected files: File[] = [];
  protected previews: string[] = [];
  protected fuelTypes = Object.values(FuelType);
  protected transmissionTypes = Object.values(TransmissionType);
  protected isSubmitting = false;

  protected car: Car = {
    trackingid : '',
    titre: '',
    modele: {
      nom: '',
      marque: {
        nom: '',
        trackingId: ''
      },
      trackingId: ''
    },
    annee: 0,
    kilometrage: 0,
    typeCarburant: FuelType.ESSENCE,
    transmission: TransmissionType.AUTOMATIQUE,
    prix: 0,
    negociable: false,
    paiementEnPlus: false,
    echangePossible: false,
    description: '',
    images: [],
    itemTags: [],
    reviews: [],
    caracteristiques: [],
    couleur: '',
    puissance: 0
  };

marqueInput: string = '';
selectedMarque: string = '';

  constructor(
    private router: Router,
    private marqueService: MarqueService,
    private modeleService: ModeleService,
    private carsService: CarsService
  ) {}

  ngOnInit(): void {
    this.loadMarquesAndModeles();
  }

  onMarqueSelect(event: Event): void {
    const marqueNom = (event.target as HTMLSelectElement).value;
    if (marqueNom) {
      const selectedMarque = this.marques.find(marque => marque.nom === marqueNom);
      if (selectedMarque) {
        if (!this.car.modele) {
          this.car.modele = {
            nom: '',
            marque: selectedMarque,
            trackingId: ''
          };
        } else {
          this.car.modele.marque = selectedMarque;
        }
        this.filteredModeles = this.modeles.filter(m => m.marque?.nom === marqueNom);
      }
    }
  }

  onModeleSelect(event: Event): void {
    const modeleNom = (event.target as HTMLSelectElement).value;
    if (modeleNom) {
      const selectedModele = this.modeles.find(m => m.nom === modeleNom);
      if (selectedModele) {
        this.car.modele = selectedModele;
      }
    }
  }

  loadMarquesAndModeles(): void {
    forkJoin({
      marques: this.marqueService.findAll(),
      modeles: this.modeleService.findAll()
    }).subscribe({
      next: (response) => {
        console.log('Marques et modèles chargés avec succès:', response);
        
        if (response.marques.data) {
          this.marques = response.marques.data;
        }
        if (response.modeles.data) {
          this.modeles = response.modeles.data;
          this.filteredModeles = this.modeles;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données:', error);
        this.message = 'Erreur lors du chargement des marques et modèles';
      }
    });
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Réinitialiser les tableaux
      this.files = [];
      this.previews = [];

      // Ajouter les nouveaux fichiers
      Array.from(input.files).forEach(file => {
        if (file.type.startsWith('image/')) {
          this.files.push(file);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          console.error('Le fichier', file.name, 'n\'est pas une image');
        }
      });

      // Stocker les fichiers
      this.car.images = this.files;
      console.log('Fichiers sélectionnés:', this.files);
    }
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.previews.splice(index, 1);
  }

  onSubmit(): void {
    console.log('onSubmit');
    console.log(this.car);
    if (!this.checkRequiredFields()) {
      this.message = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    const marqueNom = this.car.modele?.marque?.nom;
    const modeleNom = this.car.modele?.nom;

    if (!marqueNom) {
      this.message = 'Le nom de la marque est requis';
      return;
    }

    if (!modeleNom) {
      this.message = 'Le nom du modèle est requis';
      return;
    }

    // 1. D'abord créer ou récupérer la marque
    this.createOrGetMarque(marqueNom).subscribe({
      next: (marqueResponse) => {
        if (marqueResponse.error || !marqueResponse.data) {
          this.message = 'Erreur lors de la création/récupération de la marque';
          return;
        }

        const marque = marqueResponse.data;
        console.log('Marque créée/récupérée avec succès:', marque);
        
        // Vérification de l'ID de la marque
        const marqueId = marque.trackingId || marque.trackingid;
        if (!marqueId) {
          this.message = 'ID de marque manquant dans la réponse';
          return;
        }

        // 2. Ensuite créer ou récupérer le modèle avec l'ID de la marque
        this.createOrGetModele(modeleNom, marqueId).subscribe({
          next: (modeleResponse) => {
            console.log('modeleNom:', modeleNom);
            console.log('marqueId:', marqueId);
            if (modeleResponse.error || !modeleResponse.data) {
              this.message = 'Erreur lors de la création/récupération du modèle';
              return;
            }

            const modele = modeleResponse.data;
            console.log('Modèle créé/récupéré avec succès:', modele);

            // 3. Mettre à jour l'objet car avec les IDs corrects
            const modeleId = modele.trackingId || (modele as any).trackingid;
            console.log('ID du modèle à assigner:', modeleId);

            this.car.modele = {
                ...modele,
                trackingId: modeleId,
                marque: {
                    ...marque,
                    trackingId: marqueId
                }
            };

            console.log('Objet car mis à jour:', this.car);

            // 4. Créer la voiture
            this.submitCar();
          },
          error: (error) => {
            console.error('Erreur lors de la création/récupération du modèle:', error);
            this.message = 'Erreur lors de la création/récupération du modèle';
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la création/récupération de la marque:', error);
        this.message = 'Erreur lors de la création/récupération de la marque';
      }
    });
  }

  private createOrGetMarque(marqueNom: string): Observable<GlobalResponse<Marque>> {
    console.log('Création/récupération de la marque avec nom:', marqueNom);
    
    if (!marqueNom) {
        return of({
            timestamp: new Date(),
            error: true,
            message: 'Nom de marque requis',
            data: {
                trackingId: '',
                nom: ''
            }
        });
    }
    return this.marqueService.findByNom(marqueNom).pipe(
        map(response => {
            // Correction du format de l'ID
            if (response.data && response.data.trackingid) {
                response.data.trackingId = response.data.trackingid;
            }
            return response;
        }),
        catchError(() => {
            return this.marqueService.create({ nom: marqueNom });
        })
    );
  }


  private createOrGetModele(modeleNom: string, marqueId: string): Observable<GlobalResponse<Modele>> {
    console.log('Création/récupération du modèle avec:', { modeleNom, marqueId });
    
    if (!modeleNom || !marqueId) {
      console.error('Données manquantes:', { modeleNom, marqueId });
      return of({
        timestamp: new Date(),
        error: true,
        message: 'Nom de modèle et ID de marque requis',
        data: {
          trackingId: '',
          nom: '',
                marque: {
                    trackingId: '',
                    nom: ''
                }
              }
            });
          }
          
          return this.modeleService.findByNomAndMarqueId(modeleNom, marqueId).pipe(
            map(response => {
                // Correction du format de l'ID
                if (response.data) {
                    const modele = response.data;
                    modele.trackingId = modele.trackingId || (modele as any).trackingid;
                    if (modele.marque) {
                        modele.marque.trackingId = modele.marque.trackingId || (modele.marque as any).trackingid;
                    }
                }
                console.log('Réponse modèle après correction:', response);
                return response;
            }),
            catchError(() => {
                console.log('Modèle non trouvé, création d\'un nouveau modèle');
                const newModele = {
                    nom: modeleNom,
                    marqueId: marqueId
                };
                console.log('Nouveau modèle à créer:', newModele);
                return this.modeleService.create(newModele);
            }),
        );
      }
      private submitCar(): void {
    const carToSubmit: CarRequest = {
        titre: this.car.titre || '',
        modeleId: this.car.modele?.trackingId || '',
        modeleNom: this.car.modele?.nom || '',
        marqueId: this.car.modele?.marque?.trackingId || '',
        marqueNom: this.car.modele?.marque?.nom || '',
        annee: this.car.annee || 0,
        kilometrage: this.car.kilometrage || 0,
        couleur: this.car.couleur,
        typecarburant: this.car.typeCarburant,
        transmission: this.car.transmission,
        puissance: this.car.puissance || 0,
        caracteristiques: this.car.caracteristiques || [],
        prix: this.car.prix || 0,
        negociable: this.car.negociable || false,
        paiementenplus: this.car.paiementEnPlus || false,
        echangepossible: this.car.echangePossible || false,
        description: this.car.description || '',
        images: this.car.images || [],
        reviewsIds: [],
        notemoyenne: this.car.noteMoyenne || 0,
        nombreavis: this.car.nombreAvis || 0
    };

    console.log('Envoi de la voiture:', carToSubmit);

    this.carsService.create(carToSubmit).subscribe({
        next: (response) => {
            console.log('Voiture créée avec succès:', response);
            this.router.navigate(['/dashboard/cars']);
        },
        error: (error) => {
            console.error('Erreur lors de la création de la voiture:', error);
            this.message = 'Erreur lors de la création de la voiture: ' + (error.error?.message || error.message);
        }
    });
  }

  updateCaracteristiques(caracteristique: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.car.caracteristiques.push(caracteristique);
    } else {
      this.car.caracteristiques = this.car.caracteristiques.filter(c => c !== caracteristique);
    }
  }
  
  checkRequiredFields(): boolean {
    let val = false;
    if(this.car.titre && this.car.modele && this.car.modele.marque && this.car.annee && this.car.kilometrage && this.car.typeCarburant && this.car.transmission && this.car.prix && this.car.description){
      val = true;
    }
    return val;
  }

  updateMarqueName(nom: string): void {
    if (!this.car.modele) {
      this.car.modele = {
        nom: '',
        marque: {
          nom: '',
          trackingId: ''
        },
        trackingId: ''
      };
    }
    if (!this.car.modele.marque) {
      this.car.modele.marque = {
        nom: '',
        trackingId: ''
      };
    }
    this.car.modele.marque.nom = nom;
  }

  updateModelName(nom: string): void {
    if (!this.car.modele) {
      this.car.modele = {
        nom: '',
        marque: {
          nom: '',
          trackingId: ''
        },
        trackingId: ''
      };
    }
    this.car.modele.nom = nom;
  }
}

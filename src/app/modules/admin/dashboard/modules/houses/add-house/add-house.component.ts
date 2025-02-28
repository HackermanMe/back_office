import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HousesService } from '../../../services/houses/houses.service';
import { House } from '../../../../../../models/house';
import { HouseRequest } from '../../../../../../models/requests/house-request';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-house',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  previews: string[] = [];
  files: File[] = [];
  message: string = '';
  isSubmitting = false;

  protected house: HouseRequest = {
    titre: '',
    type: '',
    chambres: 0,
    sallesDeBain: 0,
    surface: 0,
    adresse: '',
    ville: '',
    district: '',
    description: '',
    prix: 0,
    negociable: false,
    paiementEnPlus: false,
    caracteristiques: [],
    images: [],
    aGarage: false,
    aParking: false,
    aJardin: false,
    aPiscine: false,
    aTerrasse: false,
    aAscenseur: false,
    anneeConstruction: 0,
    proprietaireId: null,
    itemTagsIds: [],
    reviewsIds: [],
    notemoyenne: 0,
    nombreavis: 0
  };

  constructor(
    private router: Router,
    private housesService: HousesService
  ) {}

  handleFileInput(event: Event): void {
    console.log('Début du traitement des fichiers');
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      console.log('Nombre de fichiers sélectionnés:', files.length);
      
      // Réinitialiser les tableaux
      this.files = [];
      this.previews = [];
      
      files.forEach((file, index) => {
        if (this.files.length < 10) {
          console.log('Traitement du fichier', index + 1, ':', file.name);
          this.files.push(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              this.previews.push(e.target.result as string);
              console.log('Preview ajouté pour', file.name);
            }
          };
          reader.readAsDataURL(file);
        }
      });
      
      this.house.images = this.files;
      console.log('Images mises à jour dans house:', this.files.length, 'fichiers');
    }
  }

  removeFile(index: number): void {
    console.log('Suppression du fichier à l\'index:', index);
    this.files.splice(index, 1);
    this.previews.splice(index, 1);
    this.house.images = this.files;
    console.log('Nombre de fichiers restants:', this.files.length);
  }

  updateCaracteristiques(caracteristique: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log('Mise à jour caractéristique:', caracteristique, 'checked:', isChecked);
    if (isChecked) {
      this.house.caracteristiques.push(caracteristique);
    } else {
      this.house.caracteristiques = this.house.caracteristiques.filter(c => c !== caracteristique);
    }
    console.log('Caractéristiques mises à jour:', this.house.caracteristiques);
  }

  checkRequiredFields(): boolean {
    const isValid = Boolean(this.house.titre) &&
           Boolean(this.house.type) &&
           Boolean(this.house.chambres) &&
           Boolean(this.house.sallesDeBain) &&
           Boolean(this.house.surface) &&
           Boolean(this.house.adresse) &&
           Boolean(this.house.ville) &&
           Boolean(this.house.prix) &&
           Boolean(this.house.description);
    
    console.log('Validation des champs requis:', isValid);
    if (!isValid) {
      console.log('Champs manquants:', {
        titre: !this.house.titre,
        type: !this.house.type,
        chambres: !this.house.chambres,
        sallesDeBain: !this.house.sallesDeBain,
        surface: !this.house.surface,
        adresse: !this.house.adresse,
        ville: !this.house.ville,
        prix: !this.house.prix,
        description: !this.house.description
      });
    }
    return isValid;
  }

  onSubmit(): void {
    console.log('Début de la soumission du formulaire');
    console.log('État actuel de house:', this.house);
    
    if (!this.checkRequiredFields()) {
      this.message = 'Veuillez remplir tous les champs obligatoires';
      console.log('Formulaire invalide:', this.message);
      return;
    }

    this.isSubmitting = true;
    console.log('Envoi des données au service...');
    
    this.housesService.create(this.house).subscribe({
      next: (response) => {
        console.log('Maison créée avec succès:', response);
        this.router.navigate(['/dashboard/houses']);
      },
      error: (error) => {
        console.error('Erreur lors de la création de la maison:', error);
        this.message = 'Erreur lors de la création de la maison: ' + (error.error?.message || error.message);
        this.isSubmitting = false;
      }
    });
  }
}

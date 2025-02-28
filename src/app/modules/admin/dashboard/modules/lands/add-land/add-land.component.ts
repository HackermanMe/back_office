import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LandRequest } from '../../../../../../models/requests/land-request';
import { LandsService } from '../../../services/lands/lands.service';

@Component({
  selector: 'app-add-land',
  templateUrl: './add-land.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AddLandComponent {
  land: LandRequest = {
    titre: '',
    surface: 0,
    adresse: '',
    ville: '',
    district: '',
    description: '',
    prix: 0,
    negociable: false,
    paiementEnPlus: false,
    aEau: false,
    aElectricite: false,
    constructible: false,
    caracteristiques: [],
    images: [],
    documentsCadastraux: [],
    certificatUrbanisme: [],
    proprietaireId: null,
    itemTagsIds: [],
    reviewsIds: [],
    noteMoyenne: 0,
    nombreAvis: 0
  };

  previews: string[] = [];
  documentsCadastrauxPreview: string[] = [];
  certificatUrbanismePreview: string[] = [];
  message: string = '';
  isSubmitting: boolean = false;

  caracteristiquesDisponibles: string[] = [
    'Clôturé',
    'Accès route',
    'Plat',
    'En pente',
    'Vue dégagée',
    'Proche commodités',
    'Zone résidentielle',
    'Zone agricole'
  ];

  constructor(private landsService: LandsService, private router: Router) {}

  handleFileInput(event: any): void {
    const files = event.target.files;
    if (files) {
      this.previews = [];
      this.land.images = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.match('image.*')) {
          this.land.images.push(file);
          
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  handleDocumentsCadastraux(event: any): void {
    const files = event.target.files;
    if (files) {
      this.documentsCadastrauxPreview = [];
      this.land.documentsCadastraux = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.land.documentsCadastraux.push(file);
        this.documentsCadastrauxPreview.push(file.name);
      }
    }
  }

  handleCertificatUrbanisme(event: any): void {
    const files = event.target.files;
    if (files) {
      this.certificatUrbanismePreview = [];
      this.land.certificatUrbanisme = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.land.certificatUrbanisme.push(file);
        this.certificatUrbanismePreview.push(file.name);
      }
    }
  }

  removeFile(index: number): void {
    this.previews.splice(index, 1);
    this.land.images.splice(index, 1);
  }

  removeDocumentCadastral(index: number): void {
    if (this.documentsCadastrauxPreview && this.land.documentsCadastraux) {
      this.documentsCadastrauxPreview.splice(index, 1);
      this.land.documentsCadastraux.splice(index, 1);
    }
  }

  removeCertificatUrbanisme(index: number): void {
    if (this.certificatUrbanismePreview && this.land.certificatUrbanisme) {
      this.certificatUrbanismePreview.splice(index, 1);
      this.land.certificatUrbanisme.splice(index, 1);
    }
  }

  updateCaracteristiques(caracteristique: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.land.caracteristiques.push(caracteristique);
    } else {
      this.land.caracteristiques = this.land.caracteristiques.filter(c => c !== caracteristique);
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.validateForm()) {
      console.log('Formulaire invalide:', this.message);
      console.log('Land:', this.land);
      return;
    }

    this.isSubmitting = true;
    this.landsService.create(this.land).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/lands']);
      },
      error: (error) => {
        this.message = error.message || 'Une erreur est survenue lors de l\'ajout du terrain';
      }
    });
  }

  private validateForm(): boolean {
    if (!this.land.titre) {
      this.message = 'Le titre est requis';
      return false;
    }
    if (!this.land.adresse) {
      this.message = 'L\'adresse est requise';
      return false;
    }
    if (!this.land.ville) {
      this.message = 'La ville est requise';
      return false;
    }
    if (!this.land.surface || this.land.surface <= 0) {
      this.message = 'La surface doit être supérieure à 0';
      return false;
    }
    if (!this.land.prix || this.land.prix <= 0) {
      this.message = 'Le prix doit être supérieur à 0';
      return false;
    }
    if (!this.land.description) {
      this.message = 'La description est requise';
      return false;
    }
    return true;
  }
}

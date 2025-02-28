import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterRequest } from '../../../../models/auth/register-request';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
})
export class RegisterComponent implements OnInit {
  registerRequest: RegisterRequest = {
    prenom: '',
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    numeroDeTelephone: ''
  };
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
  }

  validateForm(): boolean {
    if (!this.registerRequest.prenom || !this.registerRequest.nom || 
        !this.registerRequest.email || !this.registerRequest.password || 
        !this.registerRequest.confirmPassword || !this.registerRequest.numeroDeTelephone) {
      this.error = 'Tous les champs sont obligatoires';
      return false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.registerRequest.email)) {
      this.error = 'Format d\'email invalide';
      return false;
    }

    // Password validation
    if (this.registerRequest.password.length < 6) {
      this.error = 'Le mot de passe doit contenir au moins 6 caractères';
      return false;
    }

    // Password match validation
    if (this.registerRequest.password !== this.registerRequest.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
      return false;
    }

    // Phone number validation
    const phoneRegex = /^\+?[0-9]{8,}$/;
    if (!phoneRegex.test(this.registerRequest.numeroDeTelephone)) {
      this.error = 'Format de numéro de téléphone invalide';
      return false;
    }

    this.error = '';
    return true;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.validateForm()) {
      return;
    }
    
    this.loading = true;
    this.error = '';
    
    this.authService.register(this.registerRequest)
    .subscribe({
      next: () => {
        this.router.navigate(['../'], { 
            queryParams: { registered: true }
          });
        },
        error: error => {
          this.error = error.error?.message || 'Une erreur est survenue lors de l\'inscription';
          this.loading = false;
        }
      });
  }
}
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-house',
  standalone: false,
  
  templateUrl: './add-house.component.html',
  styleUrl: './add-house.component.css'
})
export class AddHouseComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  previews: string[] = [];
  files: File[] = [];

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      files.forEach(file => {
        if (this.files.length < 10) {
          this.files.push(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              this.previews.push(e.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.previews.splice(index, 1);
  }

  onSubmit(): void {
    // TODO: Implémenter la soumission du formulaire
    console.log('Formulaire soumis');
  }
}

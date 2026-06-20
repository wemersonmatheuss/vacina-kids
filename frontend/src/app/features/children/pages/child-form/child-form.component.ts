import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonButton, IonInput, IonSpinner } from '@ionic/angular/standalone';
import { filter, map, switchMap, take } from 'rxjs';

import { FirestoreDataService } from '../../../../core/services/firestore-data.service';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';

function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

@Component({
  selector: 'app-child-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonInput,
    IonButton,
    IonSpinner,
    FormFieldComponent,
    SvgIconComponent,
  ],
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss'],
})
export class ChildFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly firestoreData = inject(FirestoreDataService);

  readonly isEditMode = this.route.snapshot.data['mode'] === 'edit';
  readonly pageTitle = this.isEditMode ? 'Editar criança' : 'Adicionar criança';
  readonly submitLabel = this.isEditMode ? 'Salvar alterações' : 'Adicionar criança';
  readonly maxBirthDate = toDateInputValue(new Date());

  isLoading = false;
  isLoadingChild = this.isEditMode;
  errorMessage = '';

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', Validators.required],
    gender: ['male' as 'male' | 'female', Validators.required],
  });

  constructor() {
    if (this.isEditMode) {
      this.route.paramMap
        .pipe(
          map((params) => params.get('id') ?? ''),
          filter((childId) => !!childId),
          switchMap((childId) => this.firestoreData.getChildById(childId)),
          take(1)
        )
        .subscribe((child) => {
          this.isLoadingChild = false;

          if (!child) {
            this.errorMessage = 'Criança não encontrada.';
            return;
          }

          this.form.patchValue({
            name: child.name,
            birthDate: toDateInputValue(child.birthDate),
            gender: child.gender,
          });
        });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = this.form.getRawValue();

    if (this.isEditMode) {
      const childId = this.route.snapshot.paramMap.get('id') ?? '';

      this.firestoreData.updateChild(childId, formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/criancas', childId]);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Não foi possível salvar as alterações.';
          console.error(error);
        },
      });

      return;
    }

    this.firestoreData.addChild(formData).subscribe({
      next: (childId) => {
        this.isLoading = false;
        this.router.navigate(['/criancas', childId]);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Não foi possível adicionar a criança.';
        console.error(error);
      },
    });
  }
}

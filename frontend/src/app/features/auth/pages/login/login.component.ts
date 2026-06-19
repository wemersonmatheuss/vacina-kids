import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonInput,
  IonSpinner,
} from '@ionic/angular/standalone';

import { AuthService } from '../../../../core/services/auth.service';
import { isFirebaseConfigured } from '../../../../core/utils/auth-error.util';
import { environment } from '../../../../../environments/environment';
import { AuthLayoutComponent } from '../../../../shared/components/auth-layout/auth-layout.component';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonInput,
    IonButton,
    IonSpinner,
    AuthLayoutComponent,
    FormFieldComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  isLoading = false;
  errorMessage = '';
  readonly isFirebaseConfigured = isFirebaseConfigured(environment.firebase);

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (!this.isFirebaseConfigured) {
      this.errorMessage =
        'Configure o Firebase em src/environments/environment.ts antes de entrar.';
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.form.getRawValue();

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = this.authService.getAuthErrorMessage(error);
      },
    });
  }
}

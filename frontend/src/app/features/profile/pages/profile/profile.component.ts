import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, AsyncPipe } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonInput, IonSpinner } from '@ionic/angular/standalone';

import { AuthService } from '../../../../core/services/auth.service';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';

function passwordMatchValidator(
  group: AbstractControl
): ValidationErrors | null {
  const newPassword = group.get('newPassword')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  return newPassword === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonSpinner,
    FormFieldComponent,
    SvgIconComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly profile$ = this.authService.profile$;

  isSavingName = false;
  isSavingPassword = false;
  nameErrorMessage = '';
  nameSuccessMessage = '';
  passwordErrorMessage = '';
  passwordSuccessMessage = '';

  readonly nameForm = this.formBuilder.nonNullable.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
  });

  readonly passwordForm = this.formBuilder.nonNullable.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator }
  );

  constructor() {
    this.profile$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((profile) => {
        if (profile) {
          this.nameForm.patchValue(
            { displayName: profile.displayName },
            { emitEvent: false }
          );
        }
      });
  }

  saveName(): void {
    if (this.nameForm.invalid) {
      this.nameForm.markAllAsTouched();
      return;
    }

    this.isSavingName = true;
    this.nameErrorMessage = '';
    this.nameSuccessMessage = '';

    const { displayName } = this.nameForm.getRawValue();

    this.authService.updateDisplayName(displayName).subscribe({
      next: () => {
        this.isSavingName = false;
        this.nameSuccessMessage = 'Nome atualizado com sucesso.';
      },
      error: (error) => {
        this.isSavingName = false;
        this.nameErrorMessage = this.authService.getAuthErrorMessage(error);
      },
    });
  }

  savePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isSavingPassword = true;
    this.passwordErrorMessage = '';
    this.passwordSuccessMessage = '';

    const { currentPassword, newPassword } = this.passwordForm.getRawValue();

    this.authService.updatePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.isSavingPassword = false;
        this.passwordSuccessMessage = 'Senha alterada com sucesso.';
        this.passwordForm.reset();
      },
      error: (error) => {
        this.isSavingPassword = false;
        this.passwordErrorMessage =
          this.authService.getAuthErrorMessage(error);
      },
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}

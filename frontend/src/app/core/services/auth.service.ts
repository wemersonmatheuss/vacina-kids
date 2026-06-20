import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword as firebaseUpdatePassword,
  updateProfile,
  User,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  docData,
  setDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';

import { UserProfile } from '../../shared/interfaces/user-profile.interface';
import { SeedService } from './seed.service';
import { getAuthErrorMessage } from '../utils/auth-error.util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);
  private readonly seedService = inject(SeedService);

  readonly user$ = authState(this.auth);

  readonly profile$: Observable<UserProfile | null> = this.user$.pipe(
    switchMap((user) => {
      if (!user) {
        return of(null);
      }

      return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
        map((data) => {
          if (!data) {
            return null;
          }

          return {
            uid: user.uid,
            email: data['email'] ?? user.email ?? '',
            displayName: data['displayName'] ?? user.displayName ?? 'Responsável',
            createdAt: data['createdAt']?.toDate?.() ?? new Date(),
          } satisfies UserProfile;
        })
      );
    })
  );

  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((credential) => credential.user),
      switchMap((user) =>
        this.seedService.seedUserDataIfNeeded(user.uid).pipe(
          map(() => user),
          catchError(() => of(user))
        )
      )
    );
  }

  register(
    email: string,
    password: string,
    displayName: string
  ): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((credential) =>
        from(updateProfile(credential.user, { displayName })).pipe(
          map(() => credential.user)
        )
      ),
      switchMap((user) =>
        from(
          setDoc(doc(this.firestore, `users/${user.uid}`), {
            email: user.email,
            displayName,
            createdAt: serverTimestamp(),
          })
        ).pipe(map(() => user))
      ),
      switchMap((user) =>
        this.seedService.seedUserDataIfNeeded(user.uid).pipe(
          map(() => user),
          catchError(() => of(user))
        )
      )
    );
  }

  getAuthErrorMessage(error: unknown): string {
    return getAuthErrorMessage(error);
  }

  updateDisplayName(displayName: string): Observable<void> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('Usuário não autenticado.');
    }

    return from(updateProfile(user, { displayName })).pipe(
      switchMap(() =>
        from(
          setDoc(
            doc(this.firestore, `users/${user.uid}`),
            { displayName },
            { merge: true }
          )
        )
      ),
      map(() => undefined)
    );
  }

  updatePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<void> {
    const user = this.auth.currentUser;

    if (!user?.email) {
      throw new Error('Usuário não autenticado.');
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    return from(reauthenticateWithCredential(user, credential)).pipe(
      switchMap(() => from(firebaseUpdatePassword(user, newPassword))),
      map(() => undefined)
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  getCurrentUserId(): string | null {
    return this.auth.currentUser?.uid ?? null;
  }
}

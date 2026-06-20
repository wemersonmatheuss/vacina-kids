import {
  Observable,
  catchError,
  defer,
  map,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

import { getLoadErrorMessage } from './load-error.util';
import { LoadState } from '../interfaces/load-state.interface';

export function toLoadState<T>(
  source: Observable<T>,
  defaultErrorMessage?: string
): Observable<LoadState<T>> {
  return defer(() =>
    source.pipe(
      map((data) => ({ status: 'success' as const, data })),
      catchError((error) =>
        of({
          status: 'error' as const,
          message: getLoadErrorMessage(error, defaultErrorMessage),
        })
      )
    )
  ).pipe(startWith({ status: 'loading' as const }));
}

export function createReloadableLoadState<T>(
  reload$: Subject<void>,
  sourceFactory: () => Observable<T>,
  defaultErrorMessage?: string
): Observable<LoadState<T>> {
  return reload$.pipe(
    startWith(undefined),
    switchMap(() => toLoadState(sourceFactory(), defaultErrorMessage))
  );
}

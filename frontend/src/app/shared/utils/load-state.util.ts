import { Observable, catchError, map, of, startWith, Subject, switchMap } from 'rxjs';

import { getLoadErrorMessage } from './load-error.util';
import { LoadState } from '../interfaces/load-state.interface';

export function toLoadState<T>(
  source: Observable<T>,
  defaultErrorMessage?: string
): Observable<LoadState<T>> {
  return source.pipe(
    map((data) => ({ status: 'success' as const, data })),
    startWith({ status: 'loading' as const }),
    catchError((error) =>
      of({
        status: 'error' as const,
        message: getLoadErrorMessage(error, defaultErrorMessage),
      })
    )
  );
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

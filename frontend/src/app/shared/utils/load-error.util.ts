export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

export function getLoadErrorMessage(
  error: unknown,
  fallback = 'Não foi possível carregar os dados. Tente novamente.'
): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    const messages: Record<string, string> = {
      'permission-denied':
        'Você não tem permissão para acessar estes dados.',
      'unavailable':
        'Serviço temporariamente indisponível. Verifique sua conexão.',
      'unauthenticated': 'Sessão expirada. Faça login novamente.',
    };

    const message = messages[error.code];
    if (message) {
      return message;
    }
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string' &&
    error.message.includes('network')
  ) {
    return 'Falha de conexão. Verifique sua internet e tente novamente.';
  }

  return fallback;
}

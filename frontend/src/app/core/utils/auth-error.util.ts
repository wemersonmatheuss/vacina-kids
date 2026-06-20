export function isFirebaseConfigured(firebase: {
  apiKey: string;
  projectId: string;
}): boolean {
  const placeholders = ['SUA_API_KEY', 'SEU_PROJETO_ID', 'SEU_PROJETO'];

  return (
    Boolean(firebase.apiKey) &&
    Boolean(firebase.projectId) &&
    !placeholders.some(
      (value) =>
        firebase.apiKey.includes(value) || firebase.projectId.includes(value)
    )
  );
}

export function getAuthErrorMessage(error: unknown): string {
  const code =
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
      ? error.code
      : '';

  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
    'auth/invalid-email': 'Informe um e-mail válido.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/invalid-credential': 'E-mail ou senha inválidos.',
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/requires-recent-login':
      'Por segurança, confirme sua senha atual para continuar.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde e tente novamente.',
    'auth/network-request-failed':
      'Falha de conexão. Verifique sua internet.',
    'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
      'Firebase não configurado. Preencha as credenciais em environment.ts.',
    'permission-denied':
      'Sem permissão no Firestore. Publique as regras do firebase deploy.',
  };

  if (messages[code]) {
    return messages[code];
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    if (error.message.includes('API key not valid')) {
      return messages['auth/api-key-not-valid.-please-pass-a-valid-api-key.'];
    }

    return error.message;
  }

  return 'Não foi possível concluir a operação. Tente novamente.';
}

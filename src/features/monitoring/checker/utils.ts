export function getCheckErrorMessage(error: unknown): string {
  if (error instanceof DOMException && error.name === 'TimeoutError') {
    return 'Request timed out.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Request failed.';
}

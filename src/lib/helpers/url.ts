export function getCallbackURL(searchParams: URLSearchParams): string {
  const redirect = searchParams.get('redirect');

  if (redirect === null || !redirect.startsWith('/')) {
    return '/dashboard';
  }

  return redirect;
}

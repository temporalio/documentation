import { rewrite, next } from '@vercel/functions';

export default function middleware(request) {
  const accept = request.headers.get('accept') || '';
  const headers = { Vary: 'Accept, Accept-Encoding' };

  if (accept.includes('text/markdown')) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/index';
    return rewrite(new URL(`${path}.md`, request.url), { headers });
  }

  return next({ headers });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|assets|img|scripts|favicon\\.ico|llms|.*\\.md$).*)',
  ],
};

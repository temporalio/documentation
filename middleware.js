import { rewrite, next } from '@vercel/functions';

export default function middleware(request) {
  const accept = request.headers.get('accept') || '';

  if (accept.includes('text/markdown')) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/index';
    return rewrite(new URL(`${path}.md`, request.url));
  }

  return next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|assets|img|scripts|favicon\\.ico|llms|.*\\.md$).*)',
  ],
};

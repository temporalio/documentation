import { SDKS } from '@site/src/constants/sdks';

export const DEVELOP_SECTION = '/develop';

export function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

// The SDK row and the section tabs are mutually exclusive, so both rows read
// this to decide which one renders.
export function findActiveSdk(pathname) {
  const path = normalizePath(pathname);
  return SDKS.find(({ id }) => {
    const base = `${DEVELOP_SECTION}/${id}`;
    return path === base || path.startsWith(`${base}/`);
  });
}

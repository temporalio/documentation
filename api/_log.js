// Request metadata and private Blob writes shared by the functions in api/.
// The leading underscore keeps Vercel from deploying this file as its own
// function.

const crypto = require('crypto');
const { put } = require('@vercel/blob');

function header(request, name) {
  const value = request.headers[name];
  return (Array.isArray(value) ? value[0] : value) || null;
}

// A salted hash, so repeat callers can be grouped without storing their IP.
function ipHash(request, salt) {
  const ip = header(request, 'x-real-ip') || (header(request, 'x-forwarded-for') || '').split(',')[0].trim();
  if (!ip || !salt) return null;
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 16);
}

// Writes one record as a private JSON Blob. Returns the put() promise, so the
// caller decides whether to wait for it.
function putRecord(pathname, record) {
  return put(pathname, JSON.stringify(record), {
    access: 'private',
    addRandomSuffix: false,
    contentType: 'application/json',
  });
}

module.exports = { header, ipHash, putRecord };

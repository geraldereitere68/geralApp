export function padBase64String(input) {
  return input.padEnd((input.length + 3) & ~3, '=');
}

export function applyUrlSafeReplacementsToBase64String(base64String) {
  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function convertUrlSafeBase64StringToBase64String(base64String) {
  return base64String.replace(/-/g, '+').replace(/_/g, '/');
}

export function base64urlencode(buffer) {
  const str = new TextEncoder().encode(new Uint8Array(buffer));
  return applyUrlSafeReplacementsToBase64String(btoa(String.fromCharCode(...str)));
}

export function decodeBase64WithSafeUrlReplacements(base64String) {
  const urlSafeBase64String = convertUrlSafeBase64StringToBase64String(base64String);
  const binaryStr = atob(urlSafeBase

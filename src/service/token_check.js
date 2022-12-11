export function TokenCheck() {
  const accessTokenExpiresIn = localStorage.getItem('accessTokenExpiresIn');
  const currentTime = new Date().getTime();

  if (accessTokenExpiresIn < currentTime) return true;

  return false;
}

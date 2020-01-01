export function compareUsername(
  newUsername: string,
  oldUsername: string
): boolean {
  if (!oldUsername || !newUsername) {
    return true;
  }

  if (newUsername === oldUsername) {
    return true;
  }

  return false;
}

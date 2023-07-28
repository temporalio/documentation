export function localRef(id, a_string) {
  try {
    a_string = a_string.toLowerCase();
  } catch (e) {
    throw new Error(`metadata is missing or corrupted in ${id}`);
  }
  a_string = a_string.replaceAll(" ", "-");
  return a_string;
}

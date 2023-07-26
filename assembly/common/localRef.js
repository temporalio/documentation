export function localRef(id, a_string) {
  try {
    a_string = a_string.toLowerCase();
  } catch (e) {
    throw new Error(`Sidebar metadata is missing in ${id}`);
  }
  a_string = a_string.replaceAll(" ", "-");
  return a_string;
}

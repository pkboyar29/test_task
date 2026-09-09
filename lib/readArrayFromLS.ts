export function readArrayFromLS<T>(key: string, isValid: (value: unknown) => value is T): T[] {
  try {
    const value = localStorage.getItem(key);
    if (!value) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(value);
    return Array.isArray(parsedValue) ? parsedValue.filter(isValid) : [];
  } catch {
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  }
}

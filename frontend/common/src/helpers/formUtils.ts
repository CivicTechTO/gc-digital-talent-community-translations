import { Maybe } from "../api/generated";
import { getId, notEmpty } from "./util";

/**
 * Filters out empty data from data response.
 * @param data
 * @returns T[]
 */
export function unpackMaybes<T>(data: Maybe<Array<Maybe<T>>>): T[] {
  return data?.filter(notEmpty) ?? [];
}

/**
 * Filters out empty data from data response, and returns list of ids.
 * @param data
 * @returns string[]
 */
export const unpackIds = (
  data: Maybe<Array<Maybe<{ id: string }>>>,
): string[] => unpackMaybes<{ id: string }>(data).map(getId);

/**
 * Returns the current date in the format YYYY-MM-DD.
 * @returns string
 */
export const currentDate = (): string => new Date().toISOString().slice(0, 10);

/**
 * Converts enum to a list of options for select input.
 * @param list
 * @returns Option
 */
export function enumToOptions<T>(
  list: T,
): { value: string | number; label: string }[] {
  const entries = Object.entries(list);
  const options: { value: string | number; label: string }[] = entries.reduce(
    (
      accumulator: { value: string | number; label: string }[],
      currentValue,
    ) => {
      return [
        ...accumulator,
        { value: currentValue[1], label: currentValue[0] },
      ];
    },
    [],
  );
  return options;
}

/**
 * Creates a list of values from a list of options.
 * @param list
 * @returns array
 */
export function getValues<T>(list: { value: T; label: string }[]): T[] {
  return list.map((x) => x.value);
}

/**
 * Returns a boolean indicating if the compare string matches the word being searched for (needle).
 * @param needle String that you want to search for.
 * @param compareString A single string to check.
 * @returns { boolean } True if the needle matches the compare string
 */
export function matchStringCaseDiacriticInsensitive(
  needle: string,
  compareString: string,
) {
  return (
    compareString
      .normalize("NFD") // Normalizing to NFD Unicode normal form decomposes combined graphemes into the combination of simple ones.
      .replace(/[\u0300-\u036f]/g, "") // Using a regex character class to match the U+0300 → U+036F range, it is now trivial to globally get rid of the diacritics, which the Unicode standard conveniently groups as the Combining Diacritical Marks Unicode block.
      .search(new RegExp(needle, "i")) !== -1 ||
    compareString.search(new RegExp(needle, "i")) !== -1 // This simple comparison is needed to match a string with diacritics to itself.  Refer to the "it matches strings with diacritics to the same string" test.
  );
}

/**
 * Returns a list of strings (haystack) that match the word being searched for (needle).
 * @param needle String that you want to search for.
 * @param haystack List of strings to check against.
 * @returns { string[] } List of string from the haystack matching the needle
 */
export function matchStringsCaseDiacriticInsensitive(
  needle: string,
  haystack: string[],
): string[] {
  return haystack.filter((name) =>
    matchStringCaseDiacriticInsensitive(needle, name),
  );
}

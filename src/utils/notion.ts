/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NotionRenderer } from "react-notion-x";

export type ExtendedRecordMap = Parameters<
  typeof NotionRenderer
>[0]["recordMap"];
export type Collection = ExtendedRecordMap["collection"][string];
export type CollectionValue = Collection["value"];
export type PropertySchema = CollectionValue["schema"];
export type Block = ExtendedRecordMap["block"][string];
export type BlockValue = Block["value"];
export type Property = BlockValue["properties"][string];

export function extractProperty<T = any>(value: Property): T | undefined {
  return value?.[0]?.[0];
}

export function extractTitleFromPageBlock(block: Block) {
  if (
    block.value?.type === "page" &&
    block.value.properties &&
    block.value.properties.title
  ) {
    return extractProperty<string>(block.value.properties.title);
  }
}

export function getMappedPropertiesFromPage(
  wholePage: ExtendedRecordMap,
): Record<string, { value: string; schema: PropertySchema[string] }> {
  const pageBlock = Object.values(wholePage.block)[0];
  if (!pageBlock) {
    return {};
  }
  const collection = getMapValue(wholePage.collection);
  const properties = pageBlock.value.properties;
  const schema = collection.value.schema;

  return getMappedProperties(properties, schema);
}

export function getMappedProperties(
  rawProps: any,
  schema: PropertySchema,
): Record<string, { value: string; schema: PropertySchema[string] }> {
  const mappedProperties: Record<
    string,
    Property & { schema: PropertySchema[string] }
  > = {};

  for (const key in rawProps) {
    const propSchema = schema[key];
    if (propSchema?.name) {
      mappedProperties[propSchema.name] = {
        value: extractProperty(rawProps[key]),
        schema: propSchema,
      };
    }
  }

  return mappedProperties;
}

/**
 * Given a map and a key, return the value associated with that key.
 *
 * The key can be either a string or a number. If the key is a number, it is
 * treated as an index into the array of keys in the map. If the key is a
 * string, it is treated as a key into the map.
 *
 * @param map The map to extract the value from.
 * @param key The key to extract the value for. If not provided, the first key
 * in the map is used.
 * @returns The value associated with the key, or undefined if the key is not
 * present in the map.
 */
export function getMapValue<T extends Record<string, any>>(
  map: T,
  key: number | string = 0,
): T[keyof T] {
  if (typeof key === "number") {
    return map[Object.keys(map)[key]];
  } else {
    return map[key];
  }
}

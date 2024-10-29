export function pagination<T>(
  data: T[],
  pageSize: number,
  currentPage: number,
): T[] {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  return data.slice(startIndex, endIndex);
}

export const setUnion = <T>(a: Set<T>, b: Set<T>) => {
  return new Set([...a, ...b]);
};

export const setIntersection = <T>(a: Set<T>, b: Set<T>) => {
  return new Set([...a].filter((x) => b.has(x)));
};

export const setDifference = <T>(a: Set<T>, b: Set<T>) => {
  return new Set([...a].filter((x) => !b.has(x)));
};

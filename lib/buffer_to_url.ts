interface Cache {
  [cacheKey: string]: /* url: */ string;
}

const cache: Cache = {};

export const gifDataToUrl = (gifData: Buffer, cacheKey?: string): string => {
  if (cacheKey != null && cache[cacheKey] != null) {
    return cache[cacheKey];
  }
  const url = URL.createObjectURL(new Blob([gifData], { type: "image/gif" }));
  if (cacheKey != null) {
    cache[cacheKey] = url;
  }
  return url;
};

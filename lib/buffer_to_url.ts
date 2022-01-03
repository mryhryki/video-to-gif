export const gifDataToUrl = (gifData: Buffer): string => {
  return URL.createObjectURL(new Blob([gifData], { type: "image/gif" }));
};

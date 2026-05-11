export type ImageSource = string;

export function resolveImageSource(source: ImageSource): string {
  return source;
}

export function isRemoteImage(source: ImageSource): boolean {
  return /^https?:\/\//i.test(source);
}

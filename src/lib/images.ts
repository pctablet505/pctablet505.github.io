// Images named in PROFILE.md (`image: certificates/x.png`) resolve to files in src/assets/. A missing file stops the
// build.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{png,jpg,jpeg,webp}', { eager: true });

export function imageFor(path?: string): ImageMetadata | undefined {
  if (!path) return undefined;
  const hit = files[`../assets/${path}`];
  if (!hit) throw new Error(`PROFILE.md names an image that is not in src/assets/: ${path}`);
  return hit.default;
}

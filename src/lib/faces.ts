// A face's landmarks from simple curves (jaw, brows, eyes, nose, mouth), never from a photo.
export type P = [number, number];

export function face(cx: number, cy: number, s: number): { groups: P[][]; nose: P } {
  const lin = (n: number, a: number, b: number) => Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
  const jaw: P[] = lin(17, Math.PI * 0.02, Math.PI * 0.98).map((t) => [cx + 52 * s * Math.cos(t), cy - 6 * s + 66 * s * Math.sin(t)]);
  const brow = (dx: number): P[] => lin(5, -1, 1).map((u) => [cx + dx * s + u * 15 * s, cy - 26 * s - 6 * s * (1 - u * u)]);
  const eye = (dx: number): P[] => lin(6, 0, Math.PI * 2 * (5 / 6)).map((t) => [cx + dx * s + 10 * s * Math.cos(t), cy - 10 * s + 4.5 * s * Math.sin(t)]);
  const bridge: P[] = lin(4, 0, 1).map((u) => [cx, cy - 16 * s + u * 26 * s]);
  const nostrils: P[] = lin(5, -1, 1).map((u) => [cx + u * 10 * s, cy + 14 * s - 3 * s * (1 - u * u)]);
  const mouth: P[] = lin(12, 0, Math.PI * 2 * (11 / 12)).map((t) => [cx + 20 * s * Math.cos(t), cy + 34 * s + 7 * s * Math.sin(t)]);
  return { groups: [jaw, brow(-22), brow(22), eye(-22), eye(22), bridge, nostrils, mouth], nose: [cx, cy + 10 * s] };
}

// The eyes and the mouth are closed curves; the other groups are open.
export const CLOSED = new Set([3, 4, 7]);

export const line = (pts: P[], close = false) =>
  'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L') + (close ? ' Z' : '');

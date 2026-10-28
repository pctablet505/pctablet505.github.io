// EAN-13 from its encoding tables, so a drawn barcode is a real code that a scanner would read.
const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
const G = ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'];
const R = ['1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'];
const PARITY = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
const GUARDS = new Set([0, 1, 2, 45, 46, 47, 48, 49, 92, 93, 94]);

// The 95 modules of a 13-digit code, 1 for a dark module.
export function ean13(digits: string): string {
  const d = digits.split('').map(Number);
  if (d.length !== 13 || d.some(Number.isNaN)) throw new Error(`ean13: "${digits}" is not 13 digits`);
  const sum = d.slice(0, 12).reduce((s, x, i) => s + x * (i % 2 ? 3 : 1), 0);
  if ((10 - (sum % 10)) % 10 !== d[12]) throw new Error(`ean13: bad check digit in ${digits}`);
  let m = '101';
  for (let i = 1; i <= 6; i++) m += (PARITY[d[0]][i - 1] === 'L' ? L : G)[d[i]];
  m += '01010';
  for (let i = 7; i <= 12; i++) m += R[d[i]];
  return m + '101';
}

export interface Bar {
  x: number;
  w: number;
  guard: boolean;
}

// One rectangle per run of dark modules, laid across `width` from `x0`. Guard bars are drawn taller.
export function bars(modules: string, x0: number, width: number): Bar[] {
  const w = width / modules.length;
  const out: Bar[] = [];
  for (let i = 0; i < modules.length; ) {
    if (modules[i] !== '1') {
      i++;
      continue;
    }
    let j = i;
    while (j < modules.length && modules[j] === '1') j++;
    out.push({ x: x0 + i * w, w: (j - i) * w, guard: GUARDS.has(i) });
    i = j;
  }
  return out;
}

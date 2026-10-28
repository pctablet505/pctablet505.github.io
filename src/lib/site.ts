// Views over the parsed profile: grouping, ordering, labels, dates and links. No facts live here.
import { loadProfile, type Entry, type Num, type SectionName } from './profile';

export const profile = loadProfile();
export const identity = profile.identity;
// The slogan's parts, one per line and without full stops: they are not sentences.
export const sloganLines = identity.headline.split(/,\s*/).map((s) => s.charAt(0).toUpperCase() + s.slice(1));

export const AREA_META = {
  vision: {
    label: 'Computer vision',
    blurb: 'Seeing on the device: damaged barcodes, faces, attention, documents.',
  },
  sensing: {
    label: 'Sensor and behaviour ML',
    blurb: 'Reading motion and touch: falls, crashes, and who is holding the phone.',
  },
  performance: {
    label: 'Performance and inference',
    blurb: 'Big models made to fit and run fast on phones, NPUs and one GPU, and the frameworks that ship them.',
  },
  projects: {
    label: 'Projects and tools',
    blurb: 'An independent research lab, and the tools built along the way.',
  },
} as const;
export type Area = keyof typeof AREA_META;
// The slogan's order: big models (performance), small places (vision and sensing on devices), real numbers (projects).
export const AREA_ORDER: Area[] = ['performance', 'vision', 'sensing', 'projects'];

export const STATUS_LABEL: Record<string, string> = {
  shipped: 'Shipped',
  built: 'Built',
  demo: 'Demo',
  prototype: 'Prototype',
  research: 'Research',
  merged: 'Merged',
  proposed: 'Proposed, not merged',
  published: 'Published',
  live: 'Live',
  'in-progress': 'In progress',
  planned: 'Planned',
};

export const section = (name: SectionName): Entry[] => profile.entries.filter((e) => e.section === name);

const sortKey = (e: Entry) => String(e.end === 'present' ? '9999' : (e.end ?? e.date ?? e.start ?? ''));

export const byPriority = (es: Entry[]): Entry[] =>
  [...es].sort((a, b) => a.priority - b.priority || sortKey(b).localeCompare(sortKey(a)));

export const byDate = (es: Entry[]): Entry[] => [...es].sort((a, b) => sortKey(b).localeCompare(sortKey(a)));

// One entry from each area in turn, newest first within an area, so no area sits below all the others.
export const byAreaInTurn = (es: Entry[]): Entry[] => {
  const queues = AREA_ORDER.map((a) => byDate(es.filter((e) => e.area === a)));
  const out: Entry[] = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift()!);
  return out;
};

export const byArea = (es: Entry[]): Entry[] =>
  [...es].sort(
    (a, b) =>
      AREA_ORDER.indexOf(a.area as Area) - AREA_ORDER.indexOf(b.area as Area) ||
      a.priority - b.priority ||
      sortKey(b).localeCompare(sortKey(a)),
  );

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function fmtDate(d?: string): string {
  if (!d) return '';
  if (d === 'present') return 'now';
  const [y, m, day] = d.split('-');
  if (day) return `${Number(day)} ${MONTHS[Number(m) - 1]} ${y}`;
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
}

export function fmtSpan(e: Entry): string {
  if (e.start) return e.end && e.end !== e.start ? `${fmtDate(e.start)} – ${fmtDate(e.end)}` : fmtDate(e.start);
  return fmtDate(e.date);
}

export const isExternal = (href: string) => /^https?:\/\//.test(href);

export function entryHref(e: Entry): string {
  switch (e.section) {
    case 'Work':
      return `/work/${e.id}/`;
    case 'Demos':
      return `/demos/${e.id}/`;
    case 'Experience':
      return `/experience/#${e.id}`;
    case 'Open source':
      return `/open-source/#${e.id}`;
    case 'Writing':
    case 'Notes':
      return e.url ?? '/';
    default:
      return `/certificates/#${e.id}`;
  }
}

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

export function readMinutes(e: Entry): number {
  const n = words([e.summary, ...e.parts.map((p) => p.md)].join(' '));
  return Math.max(1, Math.round(n / 220));
}

export const isCaseStudy = (e: Entry) => e.parts.length > 0;

export function numberRef(ref: string): { entry: Entry; num: Num } {
  const [eid, nid] = ref.split('.');
  const entry = profile.byId.get(eid)!;
  return { entry, num: entry.numbers.find((n) => n.id === nid)! };
}

export const work = () => section('Work');
export const workIn = (area: Area) => byPriority(work().filter((e) => e.area === area));
export const workAt = (org: string) => byPriority(work().filter((e) => e.org === org));
export const related = (e: Entry): Entry[] =>
  e.related.map((id) => profile.byId.get(id)).filter((x): x is Entry => Boolean(x));
export const usedBy = (e: Entry): Entry[] =>
  profile.entries.filter((x) => x.related.includes(e.id) || x.demo === e.id);

export const jobLabel = (org?: string): string => {
  if (!org || org === 'personal') return 'Independent';
  return profile.byId.get(org)?.org ?? org;
};

export const linksAt = (p: number) => identity.links.filter((l) => (l.priority ?? 2) === p);

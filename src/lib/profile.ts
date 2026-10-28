// Reads PROFILE.md, the one public master file, and checks it. Every page and export reads the site's facts
// through this module; a check that fails stops the build, so a broken edit never reaches the live site.
// The format is described in docs/PROFILE-FORMAT.md.
import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

export const SECTIONS = [
  'Identity', 'About', 'Experience', 'Work', 'Open source', 'Writing', 'Notes', 'Demos', 'Education',
  'Certificates', 'Awards',
] as const;
export type SectionName = (typeof SECTIONS)[number];

export const PART_NAMES = ['Problem', 'Approach', 'Results', 'What did not work', 'Deep dive'] as const;
export const AREAS = ['vision', 'sensing', 'performance', 'projects'] as const;
export const STATUSES = [
  'shipped', 'built', 'demo', 'prototype', 'research', 'merged', 'proposed', 'published', 'live', 'in-progress',
  'planned',
] as const;
const REPORTED_SOURCES = ['resume', 'LinkedIn', 'owner'];

const REQUIRED: Partial<Record<SectionName, string[]>> = {
  Experience: ['id', 'org', 'title', 'start', 'priority', 'one_line', 'skills'],
  Work: ['id', 'org', 'area', 'status', 'priority', 'one_line', 'skills'],
  'Open source': ['id', 'priority'],
  Writing: ['id', 'priority', 'date', 'venue', 'url'],
  Notes: ['id', 'priority', 'venue', 'url'],
  Demos: ['id', 'priority', 'status', 'related', 'now'],
  Education: ['id', 'priority', 'issuer'],
  Certificates: ['id', 'priority', 'issuer'],
  Awards: ['id', 'priority', 'issuer'],
};

// A measurement: a number with a unit or sign, or with a thousands comma. Bare numbers (versions) are not checked.
const MEASUREMENT =
  /\d+(?:[.,]\d+)*\s?(?:%|x\b|ms\b|tokens\/s|s\b|GiB\b|GB\b|MB\b|M\+?|k\+?|\+)|\d{1,3}(?:,\d{3})+/g;

export interface Num {
  id: string;
  value: string;
  what: string;
  status: 'checked' | 'reported';
  source: string;
  as_of?: string;
}
export interface Link {
  label: string;
  url: string;
  priority?: number;
}
export interface Part {
  name: string;
  md: string;
}
export interface Figure {
  src: string;
  alt: string;
  made: string;
}
export interface Chart {
  title: string;
  source: string;
  as_of: string;
  note?: string;
  bars?: { label: string; value: number; off?: boolean }[];
  growth?: { from: number; years: number; start: string; lines: { label: string; rate: number; high?: number }[] };
}
export interface Closed {
  source: string;
  as_of: string;
  ideas: { idea: string; why: string }[];
}
// Charts from a published report, kept in src/assets/<dir>/light/ and /dark/; the first one is the entry's preview.
export interface Report {
  title: string;
  source: string;
  date: string;
  dir: string;
  charts: { file: string; alt: string }[];
}
export interface Entry {
  section: SectionName;
  id: string;
  title: string;
  line: number;
  priority: 1 | 2 | 3;
  summary: string;
  parts: Part[];
  fields: Record<string, unknown>;
  one_line?: string;
  org?: string;
  title_field?: string;
  location?: string;
  area?: (typeof AREAS)[number];
  status?: string;
  start?: string;
  end?: string;
  date?: string;
  skills: string[];
  numbers: Num[];
  links: Link[];
  related: string[];
  demo?: string;
  wording?: string;
  url?: string;
  venue?: string;
  issuer?: string;
  image?: string;
  now?: string;
  live_url?: string;
  figure?: Figure;
  chart?: Chart;
  report?: Report;
  closed?: Closed;
}
export interface Identity {
  handle: string;
  name: string;
  headline: string;
  lede?: string;
  focus: string[];
  location: string;
  email?: string;
  links: Link[];
  photo: string | null;
  resume: string | null;
  languages: string[];
  proof: string[];
}
export interface Profile {
  identity: Identity;
  about: string;
  entries: Entry[];
  byId: Map<string, Entry>;
  raw: string;
}

class ProfileError extends Error {}

const str = (v: unknown): string | undefined => (v === undefined || v === null ? undefined : String(v));
const list = <T = string>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

function measurements(text: string): Set<string> {
  return new Set([...text.matchAll(MEASUREMENT)].map((m) => m[0].replace(/\s/g, '')));
}

interface Block {
  heading: string;
  line: number;
  lines: { text: string; line: number }[];
}

// Splits lines into blocks at headings of one level, ignoring headings inside fenced code.
function splitAt(level: number, lines: { text: string; line: number }[]): { head: Block['lines']; blocks: Block[] } {
  const marker = '#'.repeat(level) + ' ';
  const head: Block['lines'] = [];
  const blocks: Block[] = [];
  let fence: string | null = null;
  for (const l of lines) {
    const t = l.text;
    const f = t.match(/^\s*(```|~~~)/);
    if (fence) {
      if (f && f[1] === fence) fence = null;
    } else if (f) {
      fence = f[1];
    } else if (t.startsWith(marker)) {
      blocks.push({ heading: t.slice(marker.length).trim(), line: l.line, lines: [] });
      continue;
    }
    (blocks.length ? blocks[blocks.length - 1].lines : head).push(l);
  }
  if (fence) throw new ProfileError(`PROFILE.md: a code fence (${fence}) is never closed`);
  return { head, blocks };
}

const join = (ls: Block['lines']) => ls.map((l) => l.text).join('\n').trim();

// Takes the first fenced yaml block off the front of an entry's lines.
function takeYaml(lines: Block['lines'], where: string): { yaml: string; startLine: number; rest: Block['lines'] } {
  let i = 0;
  while (i < lines.length && lines[i].text.trim() === '') i++;
  if (i >= lines.length || lines[i].text.trim() !== '```yaml') {
    throw new ProfileError(`${where}: the first thing after the heading must be a \`\`\`yaml block`);
  }
  const start = i;
  let j = i + 1;
  while (j < lines.length && lines[j].text.trim() !== '```') j++;
  if (j >= lines.length) throw new ProfileError(`${where}: the yaml block is never closed`);
  return {
    yaml: lines.slice(start + 1, j).map((l) => l.text).join('\n'),
    startLine: lines[start].line,
    rest: lines.slice(j + 1),
  };
}

function loadYaml(text: string, startLine: number, where: string): Record<string, unknown> {
  try {
    const v = parseYaml(text, { prettyErrors: true, uniqueKeys: true });
    if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error('the block must be a mapping of fields');
    return v as Record<string, unknown>;
  } catch (e) {
    const err = e as { linePos?: { line: number }[]; message: string };
    const at = err.linePos?.[0]?.line ? startLine + err.linePos[0].line : startLine;
    throw new ProfileError(`PROFILE.md:${at}: ${where}: YAML error: ${err.message.split('\n')[0]}`);
  }
}

function toEntry(section: SectionName, block: Block): Entry {
  const where = `PROFILE.md:${block.line}: "${block.heading}"`;
  const { yaml, startLine, rest } = takeYaml(block.lines, where);
  const f = loadYaml(yaml, startLine, `"${block.heading}"`);
  const { head, blocks } = splitAt(4, rest);
  return {
    section,
    id: String(f.id ?? ''),
    title: block.heading,
    line: block.line,
    priority: f.priority as 1 | 2 | 3,
    summary: join(head),
    parts: blocks.map((b) => ({ name: b.heading, md: join(b.lines) })),
    fields: f,
    one_line: str(f.one_line),
    org: str(f.org),
    title_field: str(f.title),
    location: str(f.location),
    area: str(f.area) as Entry['area'],
    status: str(f.status),
    start: str(f.start),
    end: str(f.end),
    date: str(f.date),
    skills: list<string>(f.skills).map(String),
    numbers: list<Record<string, unknown>>(f.numbers).map((n) => ({
      id: String(n.id ?? ''),
      value: String(n.value ?? ''),
      what: String(n.what ?? ''),
      status: n.status as Num['status'],
      source: String(n.source ?? ''),
      as_of: str(n.as_of),
    })),
    links: list<Link>(f.links),
    related: list<string>(f.related).map(String),
    demo: str(f.demo),
    wording: str(f.wording),
    url: str(f.url),
    venue: str(f.venue),
    issuer: str(f.issuer),
    image: str(f.image),
    now: str(f.now),
    live_url: str(f.live_url),
    figure: f.figure as Figure | undefined,
    chart: f.chart ? { ...(f.chart as Chart), as_of: String((f.chart as Chart).as_of ?? '') } : undefined,
    closed: f.closed ? { ...(f.closed as Closed), as_of: String((f.closed as Closed).as_of ?? '') } : undefined,
    report: f.report ? { ...(f.report as Report), date: String((f.report as Report).date ?? '') } : undefined,
  };
}

function check(p: Profile): string[] {
  const errs: string[] = [];
  const at = (e: Entry, msg: string) => errs.push(`PROFILE.md:${e.line}: ${e.id || e.title}: ${msg}`);
  const seen = new Set<string>();
  for (const e of p.entries) {
    for (const k of REQUIRED[e.section] ?? []) {
      const v = e.fields[k];
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) at(e, `missing ${k}`);
    }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.id)) at(e, `bad id "${e.id}"`);
    if (seen.has(e.id)) at(e, `duplicate id "${e.id}"`);
    seen.add(e.id);
    if (![1, 2, 3].includes(e.priority)) at(e, `priority must be 1, 2 or 3`);
    for (const k of ['start', 'end', 'date', 'as_of']) {
      const v = e.fields[k];
      if (v !== undefined && !(k === 'end' && v === 'present') && !/^\d{4}(-\d{2}(-\d{2})?)?$/.test(String(v))) {
        at(e, `bad ${k} "${v}"`);
      }
    }
    if (e.section === 'Work') {
      if (!AREAS.includes(e.area as never)) at(e, `area must be one of ${AREAS.join(', ')}`);
      if (!STATUSES.includes(e.status as never)) at(e, `status must be one of ${STATUSES.join(', ')}`);
    }
    if (e.section === 'Demos' && !['planned', 'live'].includes(String(e.status))) at(e, 'demo status must be planned or live');
    const names = e.parts.map((x) => x.name);
    const order = PART_NAMES.filter((n) => names.includes(n));
    if (names.some((n) => !PART_NAMES.includes(n as never)) || names.join('|') !== order.join('|')) {
      at(e, `sections must be ${PART_NAMES.join(', ')}, in that order; found ${names.join(', ')}`);
    }
    const declared = new Set<string>();
    for (const n of e.numbers) {
      for (const k of ['id', 'value', 'what', 'status', 'source'] as const) if (!n[k]) at(e, `number "${n.id}" is missing ${k}`);
      if (n.status === 'checked') {
        if (!n.source.startsWith('https://') || !n.as_of) at(e, `checked number "${n.id}" needs an https source and as_of`);
      } else if (n.status === 'reported') {
        if (!REPORTED_SOURCES.includes(n.source)) at(e, `reported number "${n.id}" needs source ${REPORTED_SOURCES.join(', ')}`);
      } else {
        at(e, `number "${n.id}" status must be checked or reported`);
      }
      for (const t of measurements(n.value)) declared.add(t);
    }
    if (e.one_line && e.wording !== 'exact' && e.one_line.split(/\s+/).length > 25) at(e, 'one_line is over 25 words');
    if (e.section === 'Work' || e.section === 'Experience') {
      const text = [e.one_line ?? '', e.summary, ...e.parts.map((x) => x.md)].join('\n');
      const extra = [...measurements(text)].filter((t) => !declared.has(t));
      if (extra.length) at(e, `measurements in the text that are not in numbers: ${extra.join(', ')}`);
    }
    if (/<[a-zA-Z!/]/.test([e.summary, ...e.parts.map((x) => x.md)].join('\n').replace(/`[^`]*`/g, ''))) at(e, 'text contains HTML');
    if (e.chart) {
      const c = e.chart;
      if (!c.title || !String(c.source).startsWith('https://') || !/^\d{4}-\d{2}-\d{2}$/.test(c.as_of)) {
        at(e, 'chart needs a title, an https source and an as_of date');
      }
      if (!c.bars === !c.growth) at(e, 'chart needs either bars or growth');
      if (c.bars && (!Array.isArray(c.bars) || !c.bars.length || c.bars.some((b) => !b.label || typeof b.value !== 'number'))) {
        at(e, 'chart bars need a label and a numeric value each');
      }
      const g = c.growth;
      const badLine = (l: { label: string; rate: number; high?: number }) =>
        !l.label || typeof l.rate !== 'number' || (l.high !== undefined && !(typeof l.high === 'number' && l.high > l.rate));
      if (g && (!Number.isInteger(g.from) || !(g.years > 0) || !/\d/.test(String(g.start ?? '')) || !Array.isArray(g.lines) || !g.lines.length || g.lines.some(badLine))) {
        at(e, 'chart growth needs a from year, years above 0, a start amount, and lines with a label and a numeric rate each (high above rate)');
      }
    }
    if (e.closed) {
      const c = e.closed;
      if (!String(c.source).startsWith('https://') || !/^\d{4}-\d{2}-\d{2}$/.test(c.as_of)) {
        at(e, 'closed needs an https source and an as_of date');
      }
      if (!Array.isArray(c.ideas) || !c.ideas.length || c.ideas.some((i) => !i.idea || !i.why)) {
        at(e, 'closed ideas need an idea and a why each');
      }
      const count = e.numbers.find((n) => n.id === 'closed');
      if (count && Array.isArray(c.ideas) && Number(count.value) !== c.ideas.length) {
        at(e, `number "closed" says ${count.value}, but closed lists ${c.ideas.length} ideas`);
      }
    }
    if (e.report) {
      const r = e.report;
      if (!r.title || !String(r.source).startsWith('https://') || !/^\d{4}-\d{2}-\d{2}$/.test(r.date) || !r.dir) {
        at(e, 'report needs a title, an https source, a date and a dir');
      }
      if (!Array.isArray(r.charts) || !r.charts.length || r.charts.some((c) => !c?.file || !c?.alt)) {
        at(e, 'report charts need a file and an alt text each');
      }
    }
    for (const l of e.links) if (!l.label || !/^https?:\/\//.test(l.url ?? '')) at(e, `bad link ${JSON.stringify(l)}`);
    if (e.url && !/^https?:\/\//.test(e.url)) at(e, `bad url "${e.url}"`);
  }
  const jobs = new Set(p.entries.filter((e) => e.section === 'Experience').map((e) => e.id));
  const demos = new Set(p.entries.filter((e) => e.section === 'Demos').map((e) => e.id));
  for (const e of p.entries) {
    if (e.section === 'Work' && !jobs.has(e.org ?? '') && e.org !== 'personal') at(e, `org "${e.org}" is not an Experience id or personal`);
    if (e.demo && !demos.has(e.demo)) at(e, `demo "${e.demo}" points nowhere`);
    for (const r of e.related) if (!p.byId.has(r)) at(e, `related "${r}" points nowhere`);
  }
  const id = p.identity;
  for (const k of ['handle', 'name', 'headline', 'location'] as const) if (!id[k]) errs.push(`PROFILE.md: Identity: missing ${k}`);
  // The card has room for four labels on one line.
  if (id.focus.length > 4 || id.focus.some((f) => !f.trim())) errs.push('PROFILE.md: Identity: focus takes at most four labels, none empty');
  for (const ref of id.proof) {
    const [eid, nid] = ref.split('.');
    if (!p.byId.get(eid)?.numbers.some((n) => n.id === nid)) errs.push(`PROFILE.md: Identity: proof "${ref}" points nowhere`);
  }
  // About links to the site's own work and demo pages must point at an entry that exists.
  for (const [, kind, eid] of p.about.matchAll(/\]\(\/(work|demos)\/([^/)]+)\/?\)/g)) {
    const want = kind === 'work' ? 'Work' : 'Demos';
    if (p.byId.get(eid)?.section !== want) errs.push(`PROFILE.md: About: link /${kind}/${eid}/ points nowhere`);
  }
  return errs;
}

export function parseProfile(raw: string): Profile {
  const lines = raw.split(/\r?\n/).map((text, i) => ({ text, line: i + 1 }));
  const { blocks: sections } = splitAt(2, lines);
  let identity: Identity | undefined;
  let about = '';
  const entries: Entry[] = [];
  const seenSections: string[] = [];
  for (const s of sections) {
    if (!SECTIONS.includes(s.heading as SectionName)) {
      throw new ProfileError(`PROFILE.md:${s.line}: unknown section "${s.heading}"; sections are ${SECTIONS.join(', ')}`);
    }
    seenSections.push(s.heading);
    if (s.heading === 'Identity') {
      const { yaml, startLine } = takeYaml(s.lines, `PROFILE.md:${s.line}: Identity`);
      const f = loadYaml(yaml, startLine, 'Identity');
      identity = {
        handle: String(f.handle ?? ''),
        name: String(f.name ?? ''),
        headline: String(f.headline ?? ''),
        lede: str(f.lede),
        focus: list<string>(f.focus).map(String),
        location: String(f.location ?? ''),
        email: str(f.email),
        links: list<Link>(f.links),
        photo: str(f.photo) ?? null,
        resume: str(f.resume) ?? null,
        languages: list<string>(f.languages).map(String),
        proof: list<string>(f.proof).map(String),
      };
    } else if (s.heading === 'About') {
      about = join(s.lines);
    } else {
      const { blocks } = splitAt(3, s.lines);
      for (const b of blocks) entries.push(toEntry(s.heading as SectionName, b));
    }
  }
  if (!identity) throw new ProfileError('PROFILE.md: the Identity section is missing');
  const order = SECTIONS.filter((x) => seenSections.includes(x));
  if (seenSections.join('|') !== order.join('|')) {
    throw new ProfileError(`PROFILE.md: sections must be in this order: ${SECTIONS.join(', ')}`);
  }
  const p: Profile = { identity, about, entries, byId: new Map(entries.map((e) => [e.id, e])), raw };
  const errs = check(p);
  if (errs.length) throw new ProfileError(`PROFILE.md has ${errs.length} problem(s):\n  ${errs.join('\n  ')}`);
  return p;
}

let cached: Profile | undefined;

export function loadProfile(): Profile {
  if (!cached) cached = parseProfile(fs.readFileSync(path.join(process.cwd(), 'PROFILE.md'), 'utf8'));
  return cached;
}
